import React, { useState } from "react";
import { Table, Checkbox, Select, Input, Button } from "antd";

const { Option } = Select;

// 从文档解析的检验项目数据
const initialData = [
  { key: "1", name: "壳体外观", pcb: true, beforeSeal: true, afterLabel: false, samplePlan: "100%" },
  { key: "2", name: "焊点外观", pcb: true, beforeSeal: true, afterLabel: false, samplePlan: "100%" },
  { key: "3", name: "引出端外观", pcb: false, beforeSeal: true, afterLabel: true, samplePlan: "100%" },
  { key: "4", name: "标志外观", pcb: false, beforeSeal: false, afterLabel: true, samplePlan: "100%" },
  { key: "5", name: "壳体尺寸", pcb: false, beforeSeal: true, afterLabel: true, samplePlan: "100%" },
  { key: "6", name: "线线耐电压", pcb: true, beforeSeal: true, afterLabel: true, samplePlan: "100%" },
  { key: "7", name: "温度冲击", pcb: false, beforeSeal: false, afterLabel: true, samplePlan: "100%" },
  { key: "8", name: "插入损耗", pcb: false, beforeSeal: false, afterLabel: true, samplePlan: "表6" },
  { key: "9", name: "常温加电测压降", pcb: false, beforeSeal: true, afterLabel: false, samplePlan: "S阶段全检，D阶段首件" },
  { key: "10", name: "保险座检验", print: false, preSeal: false, postLabel: true, samplePlan: "100%" },
  { key: "11", name: "振动试验", print: false, preSeal: false, postLabel: true, samplePlan: "100%" },
  { key: "12", name: "湿热试验", print: false, preSeal: false, postLabel: true, samplePlan: "100%" },
  { key: "13", name: "冲击试验", print: false, preSeal: false, postLabel: true, samplePlan: "100%" },
  { key: "14", name: "加速度试验", print: false, preSeal: false, postLabel: true, samplePlan: "100%" },
  { key: "15", name: "浪涌测试", print: false, preSeal: false, postLabel: true, samplePlan: "100%" }

];

const InspectionForm = ({ onSave }) => {
  const [dataSource, setDataSource] = useState(initialData);
  const [selectedKeys, setSelectedKeys] = useState([]); // 选中的检验项目

  // 处理复选框选择
  const handleSelect = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
  };

  // 处理单元格编辑
  const handleInputChange = (key, field, value) => {
    setDataSource((prev) =>
      prev.map((item) => (item.key === key ? { ...item, [field]: value } : item))
    );
  };

  // 表格列定义
  const columns = [
    {
      title: "检验项目",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Checkbox
          checked={selectedKeys.includes(record.key)}
          onChange={(e) => {
            const newSelectedKeys = e.target.checked
              ? [...selectedKeys, record.key]
              : selectedKeys.filter((key) => key !== record.key);
            handleSelect(newSelectedKeys);
          }}
        >
          {text}
        </Checkbox>
      ),
    },
    {
      title: "印制件",
      dataIndex: "pcb",
      key: "pcb",
      render: (value, record) => (
        <Checkbox
          checked={value}
          disabled={!selectedKeys.includes(record.key)}
          onChange={(e) => handleInputChange(record.key, "pcb", e.target.checked)}
        />
      ),
    },
    {
      title: "灌封前",
      dataIndex: "beforeSeal",
      key: "beforeSeal",
      render: (value, record) => (
        <Checkbox
          checked={value}
          disabled={!selectedKeys.includes(record.key)}
          onChange={(e) => handleInputChange(record.key, "beforeSeal", e.target.checked)}
        />
      ),
    },
    {
      title: "贴标后",
      dataIndex: "afterLabel",
      key: "afterLabel",
      render: (value, record) => (
        <Checkbox
          checked={value}
          disabled={!selectedKeys.includes(record.key)}
          onChange={(e) => handleInputChange(record.key, "afterLabel", e.target.checked)}
        />
      ),
    },
    {
      title: "抽样方案",
      dataIndex: "samplePlan",
      key: "samplePlan",
      render: (value, record) => (
        selectedKeys.includes(record.key) ? (
          record.samplePlan === "表6" || record.samplePlan === "S阶段全检，D阶段首件" ? (
            <Input
              defaultValue={value}
              onChange={(e) => handleInputChange(record.key, "samplePlan", e.target.value)}
            />
          ) : (
            <Select
              defaultValue={value}
              style={{ width: 120 }}
              onChange={(val) => handleInputChange(record.key, "samplePlan", val)}
            >
              <Option value="AQL 0.65">AQL 0.65</Option>
              <Option value="AQL 1.0">AQL 1.0</Option>
              <Option value="AQL 1.5">AQL 1.5</Option>
              <Option value="AQL 2.5">AQL 2.5</Option>
            </Select>
          )
        ) : (
          <span>{value}</span>
        )
      ),
    },
  ];

  return (
    <div>
      <Table
        rowKey="key"
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
      <Button type="primary" style={{ marginTop: 16 }} onClick={() => onSave(dataSource)}>
        提交
      </Button>
    </div>
  );
};

export default InspectionForm;
