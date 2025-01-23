import React, { useEffect, useState } from "react";
import { Form, Select, Input, message } from "antd";
import { getFieldDefinitionById } from "../../api/fielddefinition/FieldDefinitionService";
import { getProjectFieldByProjectId, saveProjectField } from "../../api/projectfield/ProjectFieldService";

const { Option } = Select;

const TemperatureForm = ({ projectId, fieldId }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [customFields, setCustomFields] = useState({});
  const [customValues, setCustomValues] = useState({});

  /** 获取初始数据 */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [fieldResponse, projectResponse] = await Promise.all([
          getFieldDefinitionById(fieldId),
          getProjectFieldByProjectId(projectId),
        ]);

        console.log("字段定义:", fieldResponse);
        console.log("项目字段:", projectResponse);

        // 解析 `fieldResponse`，动态生成表单项
        const parsedFields = fieldResponse.data.children.map((field) => ({
          key: field.id,
          code: field.code,
          label: field.field_name,
          remarks: field.remarks,
        }));

        setFields(parsedFields);

        // 解析 `projectResponse`
        const fieldMap = {};
        projectResponse.data.forEach((item) => {
          fieldMap[item.field_id] = item;
        });

        // 初始化 `customFields` & `customValues`
        const customFieldsState = {};
        const customValuesState = {};

        parsedFields.forEach((field) => {
          const projectData = fieldMap[field.key] || {};
          const customValue = projectData.custom_value || "";

          // 是否选择了 `custom`
          const isCustom = customValue.includes("℃") || customValue === "custom";
          customFieldsState[field.key] = isCustom;

          // 解析 `custom_value`
          customValuesState[field.key] = customValue.includes("℃")
            ? customValue.split("~").map((v) => v.trim().replace("℃", ""))
            : ["", ""];
        });

        setCustomFields(customFieldsState);
        setCustomValues(customValuesState);

        // 设置表单初始值
        form.setFieldsValue(
          parsedFields.reduce((acc, field) => {
            acc[field.code] = fieldMap[field.key]?.custom_value || undefined;
            return acc;
          }, {})
        );
      } catch (error) {
        message.error("Failed to load data, please try again.");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [fieldId, projectId, form]);

  /** 自动提交 */
  const handleSave = async (key, value,code) => {
    if (!value) return;

    try {
      await saveProjectField({
        project_id: projectId,
        field_id: key,
        custom_value: value,
        code:code
      });

      message.success("数据已保存!");
    } catch (error) {
      message.error("保存失败，请重试");
      console.error("Save error:", error);
    }
  };

  /** 处理 `Select` 选择 */
  const handleChange = (key, value,code) => {
    setCustomFields((prev) => ({
      ...prev,
      [key]: value === "custom",
    }));

    if (value !== "custom") {
      handleSave(key, value,code);
    }
  };

  /** 处理 `custom` 输入框 */
  const handleCustomInputBlur = (key,code) => {
    const [min, max] = customValues[key];

    if (min && max) {
      const customValue = `${min}℃ ~ ${max}℃`;
      handleSave(key, customValue,code);
    }
  };

  return (
    <Form form={form} layout="inline">
      {fields.map((field) => (
        <div key={field.key} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Form.Item label={field.label} name={field.code}>
            <Select
              placeholder={`请选择${field.label}`}
              style={{ width: 180 }}
              onChange={(value) => handleChange(field.key, value,field.code)}
            >
              <Option value="-40℃ ~ +70℃">-40℃ ~ +70℃</Option>
              <Option value="-55℃ ~ +85℃">-55℃ ~ +85℃</Option>
              <Option value="custom">其他</Option>
            </Select>
          </Form.Item>

          {customFields[field.key] && (
            <>
              <Form.Item style={{ marginBottom: 0 }}>
                <Input
                  placeholder="最低温度(℃)"
                  style={{ width: 100 }}
                  value={customValues[field.key][0]}
                  onChange={(e) => {
                    const newValues = [...customValues[field.key]];
                    newValues[0] = e.target.value;
                    setCustomValues((prev) => ({ ...prev, [field.key]: newValues }));
                  }}
                  onBlur={() => handleCustomInputBlur(field.key,field.code)}
                />℃
              </Form.Item>
              <span> ~ </span>
              <Form.Item style={{ marginBottom: 0 }}>
                <Input
                  placeholder="最高温度(℃)"
                  style={{ width: 100 }}
                  value={customValues[field.key][1]}
                  onChange={(e) => {
                    const newValues = [...customValues[field.key]];
                    newValues[1] = e.target.value;
                    setCustomValues((prev) => ({ ...prev, [field.key]: newValues }));
                  }}
                  onBlur={() => handleCustomInputBlur(field.key)}
                />℃
              </Form.Item>
            </>
          )}
        </div>
      ))}
    </Form>
  );
};

export default TemperatureForm;
