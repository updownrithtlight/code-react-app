import React, { useState, useEffect } from "react";
import { Checkbox, List, Button, message } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { getAllTechnicalFeatures } from "../api/ImportantNotesService";
import { getProjectFeatures, saveProjectFeatures } from "../api/ProjectImportantNotesService";

/**
 * 单个可拖拽列表项
 */
const SortableItem = ({ item, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.note_id });

  return (
    <List.Item
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        display: "flex",
        alignItems: "center",
        background: "#f8f8f8",
        padding: "10px",
        borderRadius: "5px",
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: "grab",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "100%",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {index + 1}.
      </div>
      <span style={{ flex: 1 }}>{item.label}</span>
      <DragOutlined style={{ marginLeft: 10, cursor: "grab" }} />
    </List.Item>
  );
};

const NoticeSelection = ({ projectId }) => {
  const [technicalFeatures, setTechnicalFeatures] = useState([]); // 所有技术特点
  const [selectedFeatures, setSelectedFeatures] = useState([]); // 选中的技术特点
  const [checkedItems, setCheckedItems] = useState([]); // 复选框状态

  /**
   * 获取数据：所有技术特点 + 项目已选技术特点
   */
  useEffect(() => {

    
   if (projectId) {
      fetchData();
    }

    
    console.log("technicalFeatures",technicalFeatures)  
    console.log("selectedFeatures",selectedFeatures)  
    console.log("checkedItems",checkedItems)  
  }, [projectId]);

  const fetchData = async () => {
      
    try {

    const [allFeatures, projectFeatures] = await Promise.all([
            getAllTechnicalFeatures(),
            getProjectFeatures(projectId),

      ]);
     if (allFeatures) {
        setTechnicalFeatures(allFeatures.data);
      }
    if (Array.isArray(projectFeatures.data)) {
        setSelectedFeatures(projectFeatures.data);
        console.log("checkedItems",projectFeatures.data)  
        setCheckedItems(projectFeatures.data.map((item) => item.note_id));
      }
    } catch (error) {
      console.error("获取数据失败:", error);
      message.error("数据加载失败，请刷新页面");
    }
  };

  /**
   * 复选框变化处理
   */
  const handleCheckboxChange = (checkedValues) => {
    console.log(" handleCheckboxChange checkedValues",checkedValues)  
    console.log(" handleCheckboxChange technicalFeatures",technicalFeatures)  
    setCheckedItems(checkedValues);
    setSelectedFeatures(
      technicalFeatures
        .filter((item) => checkedValues.includes(item.id))
        .map((item, index) => ({
          note_id: item.id, // API 需要 note_id
          sort_order: index + 1, // 按顺序赋值 sort_order
          label: item.label,
        }))
    );

    setTimeout(() => {
      console.log("✅ handleCheckboxChange setSelectedFeatures (最新):", selectedFeatures);
  }, 0);
  };

  /**
   * 拖拽排序处理
   */
  const onDragEnd = (event) => {
    console.log(" 拖拽排序  ----  event",event)
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = selectedFeatures.findIndex((item) => item.note_id === active.id);
    const newIndex = selectedFeatures.findIndex((item) => item.note_id === over.id);
    const newItems = arrayMove(selectedFeatures, oldIndex, newIndex);

    // 重新赋值 sort_order
    const sortedItems = newItems.map((item, index) => ({
      ...item,
      sort_order: index + 1,
    }));
    console.log(" 拖拽排序    sortedItems",sortedItems)  

    setSelectedFeatures(sortedItems);
  };

  /**
   * 保存数据到后端
   */
  const handleSave = async () => {
    try {
      await saveProjectFeatures(projectId, selectedFeatures);
      message.success("数据保存成功！");
    } catch (error) {
      console.error("保存失败:", error);
      message.error("数据保存失败，请重试！");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "0 auto",
        padding: "20px",
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <h3>使用注意事项</h3>

      {/* 复选框选择 */}
      <Checkbox.Group value={checkedItems} onChange={handleCheckboxChange} style={{ width: "100%" }}>
        {technicalFeatures.map((option) => (
          <div key={option.id} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
            <Checkbox value={option.id} />
            <span style={{ marginLeft: "8px", flex: 1 }}>{option.label}</span>
          </div>
        ))}
      </Checkbox.Group>

      {/* 可排序列表 */}
      {selectedFeatures.length > 0 && (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={selectedFeatures.map((item) => item.note_id)} strategy={verticalListSortingStrategy}>
            <List
              bordered
              dataSource={selectedFeatures}
              renderItem={(item, index) => <SortableItem key={item.note_id} item={item} index={index} />}
              style={{ marginTop: "20px" }}
            />
          </SortableContext>
        </DndContext>
      )}

      {/* 保存按钮 */}
      {selectedFeatures.length > 0 && (
        <Button type="primary" onClick={handleSave} style={{ marginTop: "20px" }}>
          保存
        </Button>
      )}
    </div>
  );
};

export default NoticeSelection;
