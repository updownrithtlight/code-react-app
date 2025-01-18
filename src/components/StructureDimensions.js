import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, Table, Upload, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const StructureDimensions = ({ formData, setFormData }) => {
  const [form] = Form.useForm();


   // 当 formData 更新时，设置表单值
    useEffect(() => {
      if (formData && formData.basicInfo) {
        form.setFieldsValue(formData.basicInfo);
      }
    }, [formData]);

  // 固定行数据
  const fixedRows = [
    { key: 52, parameter: "外形尺寸", type: "customInput", description: "插入图片" },
    { key: 53, parameter: "壳体材质", type: "selectInput", options: ["冷轧钢板", "不锈钢 304", "不锈钢 316L", "5A06 铝合金", "6061 铝合金", "7075 铝合金"] },
    { key: 54, parameter: "表面处理", type: "multiSelectInput", options: ["电镀镍（亮处理）", "喷砂", "导电氧化本色", "导电氧化黄色", "拉丝", "化学镀镍"] }, // ✅ 改为多选
    { key: 55, parameter: "生产工艺", type: "selectInput", options: ["钣金", "铝铸"] },
    { key: 56, parameter: "输入端引出方式", type: "customInput" },
    { key: 57, parameter: "输出端引出方式", type: "customInput" },
  ];

  // 表头定义
  const columns = [
    {
      title: "序号",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "项目名称",
      dataIndex: "parameter",
      key: "parameter",
    },
    {
      title: "数据输入",
      dataIndex: "input",
      key: "input",
      render: (_, record) => {
        if (record.type === "selectInput") {
          return (
            <Form.Item name={["items", record.key, "input"]} style={{ margin: 0 }}>
              <Select placeholder="选择或输入内容">
                {record.options.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        } else if (record.type === "multiSelectInput") {
          return (
            <Form.Item name={["items", record.key, "input"]} style={{ margin: 0 }}>
              <Checkbox.Group options={record.options} />
            </Form.Item>
          );
        } else if (record.parameter === "外形尺寸") {
          return (
            <Form.Item name={["items", record.key, "input"]} style={{ margin: 0 }}>
              <Upload listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>上传图片</Button>
              </Upload>
            </Form.Item>
          );
        } else {
          return (
            <Form.Item name={["items", record.key, "input"]} style={{ margin: 0 }}>
              <Input placeholder="请输入内容" />
            </Form.Item>
          );
        }
      },
    },
  ];



  return (
    <Form form={form}  layout="vertical"
    onValuesChange={(changedValues, allValues) => setFormData(allValues)}>
      <Table columns={columns} dataSource={fixedRows} pagination={false} bordered rowKey="key" />
    </Form>
  );
};

export default StructureDimensions;
