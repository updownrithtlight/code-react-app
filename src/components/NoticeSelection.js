import React, { useState } from "react";
import { Checkbox, List } from "antd";
import { DragOutlined } from "@ant-design/icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// 注意事项数据
const noticeOptions = [
    { id: 1, label: "产品应存放在环境温度为-10℃～40℃，相对湿度小于80%，周围环境无酸性、碱性及其他有害杂质的库房中。" },
    { id: 2, label: "产品在设备中安装完成后，建议引出端连接处使用三防漆、热缩管等方式作密封处理，提高系统抗高浓度盐雾、水汽等恶劣环境的能力。" },
    { id: 3, label: "用户应将产品外壳与用户金属机箱可靠电气搭接，并尽可能降低接地阻抗。" },
    { id: 4, label: "禁止反复进行耐电压和绝缘电阻测试，防止电容失效。" },
    { id: 5, label: "建议用户在大电流使用时充分考虑散热，建议用户通过导热/导电衬垫或导热硅脂将产品紧贴设备壳体或风冷散热。" },
    { id: 6, label: "如有严酷的环境要求（湿热、盐雾、霉菌等），安装后请在产品表面喷涂三防漆或其它防锈漆。" },
    { id: 7, label: "针对引出端为穿心电容（焊接式）的产品，焊接前应提前将穿心电容引脚与所连接的导线上锡，焊接时焊接温度≤280℃，焊接时间≤3秒，焊点离穿心电容壳体3毫米之外。在安装过程中切勿让穿心电容承受轴向或径向受力。" },
    { id: 8, label: "针对引出端为螺栓的产品，应注意接线方法和控制安装扭力，避免由螺栓转动而造成的内部线路故障或质量隐患。紧固螺钉时应按下图所示：先用扳手1固定住根部螺母避免转动，再用扳手2拧紧外侧螺母。安装扭矩建议：M6螺栓2.52N.m~2.77 N.m；M4螺栓1.09N.m~1.20 N.m。" },
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


const NoticeSelection = () => {
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
      <h3>使用注意事项</h3>

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

export default NoticeSelection;

