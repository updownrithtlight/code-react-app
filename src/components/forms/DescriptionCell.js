import React, { useState } from "react";
import { Form, Select, Input } from "antd";

const { Option } = Select;

const DescriptionCell = ({ record ,handleSave}) => {
  const [isCustom, setIsCustom] = useState(false); // 是否启用输入框
  const [customValue, setCustomValue] = useState(record.description || ""); // 存储输入值

  const handleChange = (value) => {
    if (value === "其他") {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      handleSave(record.key, record.code, "description")(value);
    }
  };

  const handleInputBlur = (e) => {
    setCustomValue(e.target.value);
    handleSave(record.key, record.code, "description")(e.target.value);
  };

  return (
    <Form.Item name={["parameters", record.key, "description"]} style={{ margin: 0 }}>
      {record.descriptionOptions && !isCustom ? (
        <Select placeholder="选择说明" defaultValue={record.description} onChange={handleChange}>
          {record.descriptionOptions.map((option) => (
            <Option key={option} value={option}>
              {option}
            </Option>
          ))}
          <Option key="其他" value="其他">
            其他
          </Option>
        </Select>
      ) : (
        <Input placeholder="请输入说明" onBlur={handleInputBlur} defaultValue={customValue} autoFocus />
      )}
    </Form.Item>
  );
};

export default DescriptionCell;
