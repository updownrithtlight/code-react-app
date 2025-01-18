import React, { useEffect, useState } from "react";
import { Table, Input, Form, Select, message } from "antd";
import { getFieldDefinitionById } from "../../api/fielddefinition/FieldDefinitionService";
import { getProjectFieldByProjectIdParentId, saveProjectField } from "../../api/projectfield/ProjectFieldService";
import DescriptionCell from "./DescriptionCell";
const { Option } = Select;

const SpecialForm = ({ projectId, fieldId }) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]); // 表格数据

  // 默认单位映射
  const unitMapping = {
    "遥控功能（负逻辑）": "V",

  };
  const optionMapping ={
     "工作频率": ['无', '50Hz', '400Hz'],
     "工作线制": ['无','单相', '三相三线', '三相四线'],
  }

  const descriptionMapping = {
    "介质耐电压": ["5s，输入/输出对壳，无现象"],
    "绝缘电阻": ["100Vdc，输入/输出对壳"],
  };

  /** 获取数据（GET 请求） */
  const fetchData = async () => {
    try {
      const [fieldResponse, projectResponse] = await Promise.all([
        getFieldDefinitionById(fieldId),
        getProjectFieldByProjectIdParentId(projectId,fieldId),
      ]);

      console.log("项目字段数据", projectResponse);

      // 转换 projectResponse 为映射表（`field_id -> 数据`）
      const projectFieldMap = {};
      if (Array.isArray(projectResponse.data) && projectResponse.data.length > 0) {
        projectResponse.data.forEach((item) => {
            projectFieldMap[item.field_id] = item;
        });
    }
      // 组合 `fieldResponse` 和 `projectResponse`
      const transformedData = fieldResponse.data.children.map((item) => {
        const projectField = projectFieldMap[item.id] || {}; // 匹配 field_id，默认空对象
        return {
          key: String(item.id),
          parameter: item.field_name,
          code: item.code,
          min_value: projectField.min_value || "", // 默认空
          typical_value: projectField.typical_value || "",
          max_value: projectField.max_value || "",
          description: projectField.description || "",
          descriptionOptions: descriptionMapping[item.field_name] ,
          defaultUnit: projectField.unit || unitMapping[item.field_name] || "--",
          options:optionMapping[item.field_name]
        };
      });

      setData(transformedData);
      form.setFieldsValue({ parameters: transformedData });
    } catch (error) {
      message.error("Failed to load data, please try again.");
      console.error("Fetch error:", error);
    }
  };

  /** 失去焦点或选择值时自动提交 */
  const handleSave = (key,code, field) => async (value) => {
    if (value === undefined || value === "") return;

    console.log("提交数据:", { project_id: projectId, field_id: key, [field]: value ,code:code});

    try {
      await saveProjectField({
        project_id: projectId,
        field_id: key,
        [field]: value,
        parent_id: fieldId,
        code: code
      });

      message.success(`${field} saved successfully!`);
    } catch (error) {
      message.error(`Failed to save ${field}, please try again.`);
      console.error("Save error:", error);
    }
  };

  /** 组件挂载时获取数据 */
  useEffect(() => {
    fetchData();
  }, []);

  // 表头定义
  const columns = [
    {
      title: "项目",
      dataIndex: "parameter",
      key: "parameter",
      width: "20%",
    },
    {
      title: "最小",
      dataIndex: "min_value",
      key: "min_value",
      width: "15%",
      render: (_, record) => (
        <Form.Item name={["parameters", record.key, "min_value"]} style={{ margin: 0 }}>
          {record.options ? (
                  <Select
                  placeholder="Select Unit"
                  defaultValue={record.unit}
                  onChange={handleSave(record.key,record.code, "min_value")}
                >
               {record.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder="Enter Min" onBlur={(e) => handleSave(record.key,record.code, "min_value")(e.target.value)} defaultValue={record.min_value} />
          )}
        </Form.Item>
      ),
    },
    {
      title: "典型",
      dataIndex: "typical_value",
      key: "typical_value",
      width: "15%",
      render: (_, record) => (
        <Form.Item name={["parameters", record.key, "typical_value"]} style={{ margin: 0 }}>
             {record.options ? (
              <Select
                  placeholder="Select Unit"
                  defaultValue={record.unit}
                  onChange={handleSave(record.key,record.code, "typical_value")}
                >                       
                {record.options.map((option) => (
                         <Option key={option} value={option}>
                           {option}
                         </Option>
                       ))}
                     </Select>
                   ) : (
           <Input placeholder="Enter Typical" onBlur={(e) => handleSave(record.key,record.code, "typical_value")(e.target.value)} defaultValue={record.typical_value} />
                  )}        
        </Form.Item>
      ),
    },
    {
      title: "最大",
      dataIndex: "max_value",
      key: "max_value",
      width: "15%",
      render: (_, record) => (
        <Form.Item name={["parameters", record.key, "max_value"]} style={{ margin: 0 }}>
          {record.options ? (
          <Select
            placeholder="Select Unit"
            defaultValue={record.unit}
            onChange={handleSave(record.key,record.code, "max_value")} >             {record.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder="Enter Max" onBlur={(e) => handleSave(record.key,record.code, "max_value")(e.target.value)} defaultValue={record.max_value} />
          )}
          
        </Form.Item>
      ),
    },
    {
      title: "单位",
      dataIndex: "unit",
      key: "unit",
      width: "10%",
      render: (_, record) => (
        <Form.Item name={["parameters", record.key, "unit"]} style={{ margin: 0 }}>
          <Select
            placeholder="Select Unit"
            defaultValue={record.defaultUnit}
            onChange={handleSave(record.key,record.code, "unit")}
          >
            {record.parameter === "遥控功能（负逻辑）" || record.parameter === "介质耐电压" ? (
              <>
                <Option value="Vdc">Vdc</Option>
                <Option value="Vac">Vac</Option>
              </>
            ) : record.parameter === "电流（持续）" || record.parameter === "漏电流" ? (
              <>
                <Option value="A">A</Option>
                <Option value="mA">mA</Option>
              </>
            ) : record.parameter === "工作频率" ? (
              <Option value="Hz">Hz</Option>
            ) : record.parameter === "绝缘电阻" ? (
              <Option value="MΩ">MΩ</Option>
            ) : (
              <Option value="V">V</Option>
            )}
          </Select>
        </Form.Item>
      ),
    },
    {
      title: "说明",
      dataIndex: "description",
      key: "description",
      width: "25%",
      render: (_, record) => <DescriptionCell record={record} handleSave={handleSave} />,
    },
    
  ];

  return (
    <Form name="power_form" layout="vertical" form={form}>
      <Table columns={columns} dataSource={data} pagination={false} bordered title={() => "特殊功能"} />
    </Form>
  );
};

export default SpecialForm;
