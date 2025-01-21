import React, { useState, useEffect } from "react";
import { Table, Checkbox, Select, Input, Button, message } from "antd";
import { getInspectionItems, getProjectInspections, saveProjectInspections } from "../../api/InspectionService";

const { Option } = Select;

const InspectionForm = ({ projectId }) => {
  const [dataSource, setDataSource] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]); // 选中的检验项目

  // **📌 获取所有标准检验项目**
  useEffect(() => {
    getInspectionItems()
      .then((res) => {
        if (res.success) {
          const items = res.data.map(item => ({
            ...item,
            pcb: false,
            beforeSeal: false,
            afterLabel: false,
            samplePlan: "100%"
          }));
          setDataSource(items);
        }
      })
      .catch(() => message.error("加载检验项目失败"));
  }, []);

  // **📌 获取 `project_id` 绑定的数据**
  useEffect(() => {
    getProjectInspections(projectId)
      .then((res) => {
        if (res.success) {
          const projectInspections = res.data;
          setSelectedKeys(projectInspections.map(item => item.key));

          setDataSource(prevData =>
            prevData.map(item => {
              const found = projectInspections.find(pi => pi.key === item.key);
              return found ? { ...item, ...found } : item;
            })
          );
        }
      })
      .catch(() => message.error("加载项目检验数据失败"));
  }, [projectId]);

  // **📌 处理复选框选择**
  const handleSelect = (selectedKeys) => {
    setSelectedKeys(selectedKeys);
  };

  // **📌 处理单元格编辑**
  const handleInputChange = (key, field, value) => {
    setDataSource(prev =>
      prev.map(item => (item.key === key ? { ...item, [field]: value } : item))
    );
  };

  // **📌 提交 `project_id` 绑定的数据**
  const handleSubmit = () => {
    saveProjectInspections(projectId, dataSource.filter(item => selectedKeys.includes(item.key)))
      .then((res) => {
        if (res.success) {
          message.success("数据保存成功");
        } else {
          message.error("数据保存失败");
        }
      })
      .catch(() => message.error("提交请求失败"));
  };

  // **📌 表格列定义**
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
      <Table rowKey="key" columns={columns} dataSource={dataSource} pagination={false} />
      <Button type="primary" style={{ marginTop: 16 }} onClick={handleSubmit}>
        提交
      </Button>
    </div>
  );
};

export default InspectionForm;
