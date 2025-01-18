import React, { useEffect, useState } from "react";
import { Form, Select, Input, Button } from "antd";

const { Option } = Select;

const TemperatureForm = ({ formData, setFormData }) => {
  const [form] = Form.useForm(); // 获取表单实例
  const [customFields, setCustomFields] = useState({
    working_temperature: false,
    storage_temperature: false,
  });

  // 当 formData 更新时，设置表单值
  useEffect(() => {
    if (formData && formData.basicInfo) {
      form.setFieldsValue(formData.basicInfo);
    }
  }, [formData]);

  // 处理选择变化
  const handleChange = (field, value) => {
    setCustomFields((prev) => ({
      ...prev,
      [field]: value === "custom", // 选择“其他”时，显示输入框
    }));
  };

  // 表单提交处理
  const onFinish = (values) => {
    const processedValues = { ...values };

    // **拼接工作温度范围**
    if (customFields.working_temperature) {
      processedValues.working_temperature = `${values.customWorkingTemperatureMin}℃ ~ ${values.customWorkingTemperatureMax}℃`;
    }

    // **拼接存储温度范围**
    if (customFields.storage_temperature) {
      processedValues.storage_temperature = `${values.customStorageTemperatureMin}℃ ~ ${values.customStorageTemperatureMax}℃`;
    }

    // 清理不需要的临时输入项
    delete processedValues.customWorkingTemperatureMin;
    delete processedValues.customWorkingTemperatureMax;
    delete processedValues.customStorageTemperatureMin;
    delete processedValues.customStorageTemperatureMax;

    console.log("提交数据:", processedValues);
    setFormData(processedValues);
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      {/* 工作温度 */}
      <Form.Item
        label="工作温度"
        name="working_temperature"
        rules={[{ required: true, message: "请选择或输入工作温度！" }]}
      >
        <Select
          placeholder="请选择工作温度"
          style={{ width: 180 }}
          onChange={(value) => handleChange("working_temperature", value)}
        >
          <Option value="-40℃ ~ +70℃">-40℃ ~ +70℃</Option>
          <Option value="-55℃ ~ +85℃">-55℃ ~ +85℃</Option>
          <Option value="custom">其他</Option>
        </Select>
      </Form.Item>

      {/* 自定义工作温度输入框 */}
      {customFields.working_temperature && (
        <>
          <Form.Item
            name="customWorkingTemperatureMin"
            rules={[{ required: true, message: "请输入最低工作温度！" }]}
          >
            <Input placeholder="最低温度(℃)" style={{ width: 100 }} />℃
          </Form.Item>
          <span> ~ </span>
          <Form.Item
            name="customWorkingTemperatureMax"
            rules={[{ required: true, message: "请输入最高工作温度！" }]}
          >
            <Input placeholder="最高温度(℃)" style={{ width: 100 }} />℃
          </Form.Item>
        </>
      )}

      {/* 存储温度 */}
      <Form.Item
        label="存储温度"
        name="storage_temperature"
        rules={[{ required: true, message: "请选择或输入存储温度！" }]}
      >
        <Select
          placeholder="请选择存储温度"
          style={{ width: 180 }}
          onChange={(value) => handleChange("storage_temperature", value)}
        >
          <Option value="-55℃ ~ +85℃">-55℃ ~ +85℃</Option>
          <Option value="-55℃ ~ +125℃">-55℃ ~ +125℃</Option>
          <Option value="custom">其他</Option>
        </Select>
      </Form.Item>

      {/* 自定义存储温度输入框 */}
      {customFields.storage_temperature && (
        <>
          <Form.Item
            name="customStorageTemperatureMin"
            rules={[{ required: true, message: "请输入最低存储温度！" }]}
          >
            <Input placeholder="最低温度(℃)" style={{ width: 100 }} />℃
          </Form.Item>
          <span> ~ </span>
          <Form.Item
            name="customStorageTemperatureMax"
            rules={[{ required: true, message: "请输入最高存储温度！" }]}
          >
            <Input placeholder="最高温度(℃)" style={{ width: 100 }} />℃
          </Form.Item>
        </>
      )}

      {/* 提交按钮 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TemperatureForm;
