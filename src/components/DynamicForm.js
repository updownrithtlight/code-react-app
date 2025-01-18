import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import PowerForm from "./forms/PowerForm";
import SignalForm from "./forms/SignalForm";
import InputForm from "./forms/InputForm";
import OutputForm from "./forms/OutputForm";
import SpecialForm from "./forms/SpecialForm";
import IsolationForm from "./forms/IsolationForm";
import TemperatureForm from "./forms/TemperatureForm";
import { getFieldDefinitionById } from '../api/fielddefinition/FieldDefinition';
import { getProjectFieldByProjectId, saveProjectField, deleteProjectField } from '../api/projectfield/ProjectField';

// ✅ **硬编码组件映射表，使用 `id`**
const formComponents = {
  2: TemperatureForm,   // 温度相关
  3: PowerForm,         // 电源部分
  4: SignalForm,        // 信号部分
  5: InputForm,         // 电源输入特性
  6: OutputForm,        // 电源输出特性
  7: SpecialForm,       // 特殊功能
  8: IsolationForm      // 隔离特性
};

const REQUIRED_FORM_ID = 2; // ❗ `TemperatureForm` 的 ID，必须选中

const DynamicForm = ({ projectId }) => {
  const [formOptions, setFormOptions] = useState([]); // 复选框选项
  const [selectedForms, setSelectedForms] = useState([REQUIRED_FORM_ID]); // 选中的表单 ID，默认包含 `TemperatureForm`

  useEffect(() => {
    const fetchData = async () => {
      try {
        // **并行请求 API**
        const [fieldResponse, projectResponse] = await Promise.all([
          getFieldDefinitionById('product_specs'), // 获取字段定义
          getProjectFieldByProjectId(projectId) ,  // 获取项目字段（包含 field_id, is_checked）
          saveProjectField({ project_id: projectId, field_id:2, is_checked: true })
        ]);

        // **处理字段定义**
        const fieldDefinitions = fieldResponse.data.children; // 包含 field_id, field_name
        setFormOptions(fieldDefinitions.map((item) => ({
          label: item.field_name, // 显示名称
          value: item.id,         // ✅ 使用 `id` 作为唯一值
          disabled: item.id === REQUIRED_FORM_ID // ❗ `TemperatureForm` 不能取消
        })));

        // ✅ **获取选中的 `id`**
        const projectFields = Array.isArray(projectResponse.data) ? projectResponse.data : [];
        const selectedIds = projectFields
          .filter(item => item.is_checked) // 仅获取选中的字段
          .map(item => item.field_id); // 直接存储 `id`

        // ✅ 确保 `TemperatureForm` 始终选中
        if (!selectedIds.includes(REQUIRED_FORM_ID)) {
          selectedIds.push(REQUIRED_FORM_ID);
        }

        setSelectedForms(selectedIds); // 设置默认选中的字段

      } catch (error) {
        console.error("❌ API 调用失败:", error);
      }
    };

    fetchData();
  }, [projectId]);

  // **处理复选框状态变更**
  const handleCheckboxChange = async (checkedValues) => {
    if (!checkedValues.includes(REQUIRED_FORM_ID)) {
      // ❗ 确保 `TemperatureForm` 始终选中
      checkedValues.push(REQUIRED_FORM_ID);
    }
    
    setSelectedForms(checkedValues);

    // **查找需要新增和删除的字段**
    const fieldsToAdd = checkedValues.filter(id => !selectedForms.includes(id)); // 之前没有，现在选中了
    const fieldsToRemove = selectedForms.filter(id => !checkedValues.includes(id)); // 之前有，现在取消了

    try {
      // **批量新增**
      await Promise.all(fieldsToAdd.map(field_id => 
        saveProjectField({ project_id: projectId, field_id, is_checked: true })
      ));

      // **批量删除**
      await Promise.all(fieldsToRemove.map(field_id => 
        deleteProjectField(projectId,field_id)
      ));

      console.log("✅ 选中状态已同步到数据库");

    } catch (error) {
      console.error("❌ 更新选中状态失败:", error);
    }
  };

  return (
    <div>
      {/* 复选框控制动态显示表单 */}
      <Checkbox.Group
        options={formOptions}
        value={selectedForms} // **确保绑定的是 `id`**
        onChange={handleCheckboxChange}
        style={{ marginBottom: "20px" }}
      />

      {/* **动态渲染表单，并传递 `projectId` 和 `fieldId`** */}
      {selectedForms.map((fieldId) => {
        const FormComponent = formComponents[fieldId]; // 通过 `id` 获取表单组件
        return FormComponent ? <FormComponent key={fieldId} projectId={projectId} fieldId={fieldId} /> : null;
      })}
    </div>
  );
};

export default DynamicForm;
