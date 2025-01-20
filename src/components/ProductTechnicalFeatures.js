import React, { useState } from "react";
import { Checkbox, List } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";


const noticeOptions = [
  { id: 1, label: "产品尺寸小，外观美观。" },
  { id: 2, label: "产品的元器件和外壳可以实现100%国产化。" },
  { id: 3, label: "产品内部电子元器件的质量等级为普军级及以上等级。" },
];


// **单个可拖拽列表项**
const SortableItem = ({ item, index }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: item.id });

  return (
    <List.Item
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        display: "flex",
        alignItems: "center", // ✅ 确保元素垂直居中
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
          justifyContent: "center", // ✅ 居中序号
          width: "30px", // ✅ 固定宽度，让序号对齐
          height: "100%", // ✅ 让序号跟随列表项高度
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        {index + 1}.
      </div>
      <span style={{ flex: 1 }}>{item.label}</span> {/* ✅ 让文本自适应宽度 */}
      <DragOutlined style={{ marginLeft: 10, cursor: "grab" }} />
    </List.Item>
  );
};


const ProductTechnicalFeatures = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);

  // 处理勾选变化
  const handleCheckboxChange = (checkedValues) => {
    setCheckedItems(checkedValues);
    setSelectedItems(noticeOptions.filter((item) => checkedValues.includes(item.id)));
  };

  // 处理拖拽排序
  const onDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = selectedItems.findIndex((item) => item.id === active.id);
      const newIndex = selectedItems.findIndex((item) => item.id === over.id);
      setSelectedItems((items) => arrayMove(items, oldIndex, newIndex));
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
      <h3>产品技术特点</h3>

      {/* 复选框选择 */}
      <Checkbox.Group
        options={noticeOptions.map((option) => ({ label: option.label, value: option.id }))}
        value={checkedItems}
        onChange={handleCheckboxChange}
      />

      {/* 可排序列表 */}
      {selectedItems.length > 0 && (
        <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext items={selectedItems} strategy={verticalListSortingStrategy}>
            <List
              bordered
              dataSource={selectedItems}
              renderItem={(item, index) => <SortableItem key={item.id} item={item} index={index} />}
              style={{ marginTop: "20px" }}
            />
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default ProductTechnicalFeatures;


