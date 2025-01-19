import React, { useEffect, useState } from 'react';
import { Steps, Button, message } from 'antd';
import BasicInfoStep from './BasicInfoStep';
import DynamicForm from '../DynamicForm';
import KitForm from '../KitForm';
import StructureDimensions from '../StructureDimensions';
import CircuitSelector from '../CircuitSelector';
import ProductForm from '../ProductForm';
import TechnicalManualWordExport from '../TechnicalManualWordExport';
import ProductSpecificationWordExport from '../ProductSpecificationWordExport';
import InspectionForm from '../forms/InspectionForm';
import useProjects from '../../hooks/useProject';
import useProjectField from '../../hooks/useProjectField';
import useFieldDefinition from '../../hooks/useFieldDefinition';
import {deleteFile} from '../../api/FileService'

const StepForm = ({ id }) => {
  const [current, setCurrent] = useState(0);
  const [projectId, setProjectId] = useState(id || null);
  const [formData, setFormData] = useState({
    basicInfo: {},
  });
  const [productOptions, setProductOptions] = useState([]); // 定义 productOptions

  const [formKitData, setFormKitData] = useState({});
  const [formStructureData, setFormStructureData] = useState({});
  const [completeRequirementsParentId, setCompleteRequirementsParentId] = useState(0);
  const [structureDimensionsParentId, setStructureDimensionsParentId] = useState(0);

  // API Hooks
  const { fetchById, save } = useProjects();
  const { fetchFieldDefinitionById } = useFieldDefinition();
  const { fetchProjectFieldsByProjectIdParentId, saveProjectFieldData, deleteProjectFieldById } = useProjectField();

  const handleDeleteRow = async (fieldId, index) => {
    try {
        if (fieldId) {
        await deleteProjectFieldById(projectId,fieldId); // ✅ 调用 API 删除后端数据
        }
        // **前端同步更新 kitData**
        const updatedData = formKitData.filter((_, i) => i !== index);
        setFormKitData(updatedData); // ✅ 确保 kitData 仍然是数组
    } catch (error) {
        console.error("Delete failed:", error);
        message.error("删除失败，请重试");
    }
};



  // 图片删除
  const handleRemove = async (fileName) => {
      console.log("图片删除 fileName  delete:", fileName);
      deleteFile(fileName)
  };

  // 步骤定义
  const steps = [
    {
      title: '基本信息',
      content: <BasicInfoStep formData={formData} setFormData={setFormData} />,
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
          setFormData((prevData) => ({ ...prevData, basicInfo: response.data }));
        }
      },
      handleSubmit: async () => {
        try {
          const response = await save({ ...formData.basicInfo, projectId });
          if (!projectId) setProjectId(response.data.projectId);
          message.success('基本信息保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    {
      title: '技术参数',
      content: <DynamicForm projectId={projectId} />,
      handleSubmit: async () => setCurrent(current + 1),
    },
    {
      title: '齐套要求',
      content: (
      <KitForm 
        formKitData={formKitData} 
        setFormKitData={(data) => setFormKitData({data })}
        productOptions={productOptions}  // 传递 productOptions
        onDeleteRow={handleDeleteRow} // ✅ 传递删除方法
        parentId={completeRequirementsParentId}
        projectId={projectId} />
      ),
      loadData: async () => {
        if (projectId) {
          const  completeRequirements= await fetchFieldDefinitionById('complete_requirements');
          setCompleteRequirementsParentId(completeRequirements.data.id)
          const options = completeRequirements.data.children.map(item => ({
            id: item.id,
            value: item.field_name,  // 这里用 field_name 作为 Select 的值
            label: item.field_name,  // 显示的文本
            code: item.code,         // 额外属性
            parent_id: item.parent_id, 
          }));
          setProductOptions(options);
          const response = await fetchProjectFieldsByProjectIdParentId(projectId,completeRequirements.data.id);
          setFormKitData(response.data);
       }
      },
     handleSubmit: async () => {
        try {
          const saveData = Array.isArray(formKitData) ? 
          formKitData : Array.isArray(formKitData.data) ? formKitData.data : [];
          if (saveData.length === 0) {
            console.warn('saveProjectFieldData received an empty array, skipping API call.');
          } else {
            await saveProjectFieldData(saveData);
          }
          message.success('保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    {
      title: '结构和外形尺寸',
      content: (
        <StructureDimensions
          formStructureData={formStructureData}
          setFormStructureData={setFormStructureData}
          projectId={projectId}
          parentId={structureDimensionsParentId}
          onRemove={handleRemove}
        />
      ),
      loadData: async () => {
        if (projectId) {
          try {
            // 获取结构和外形尺寸的定义
            const structureDimensions = await fetchFieldDefinitionById("structure_dimensions");
            setStructureDimensionsParentId(structureDimensions.data.id);
      
            // 获取字段数据
            const response = await fetchProjectFieldsByProjectIdParentId(projectId, structureDimensions.data.id);
            console.log("fetchProjectFieldsByProjectIdParentId:", response);
      
            // ✅ 处理数据，将数组转换为对象格式
            const parsedData = response.data.reduce((acc, item) => {
              acc[item.code] = { ...item };
      
              // ✅ 修正 `custom_value`，如果是 JSON 字符串，则解析为数组
              if (typeof acc[item.code].custom_value === "string" && acc[item.code].custom_value.startsWith("[")) {
                try {
                  acc[item.code].custom_value = JSON.parse(acc[item.code].custom_value);
                } catch (error) {
                  console.warn(`⚠️ 解析 ${item.code} 的 custom_value 失败`, error);
                }
              }
      
              return acc;
            }, {});
      
            // ✅ 设置转换后的数据
            setFormStructureData(parsedData);
          } catch (error) {
            console.error("❌ 加载数据失败:", error);
          }
        }
      }
      ,
      handleSubmit: async () => {
        try {
          console.log("revort before:", formStructureData);
          const transformedData = Object.values(formStructureData);
          console.log("saveProjectFieldData:", transformedData);
          await saveProjectFieldData(transformedData);
          message.success('保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    {
      title: '电路图',
      content: <CircuitSelector formData={formData} setFormData={setFormData} />,
      handleSubmit: async () => setCurrent(current + 1),
    },
    {
      title: '插入损耗特性/重量/环境特性',
      content: <ProductForm formData={formData} setFormData={setFormData} />,
      handleSubmit: async () => setCurrent(current + 1),
    },
    {
      title: '生成技术说明书',
      content: <TechnicalManualWordExport projectId={projectId} />,
      handleSubmit: async () => setCurrent(current + 1),
    },
    {
      title: '试验项目',
      content: <InspectionForm projectId={projectId} />,
      handleSubmit: async () => setCurrent(current + 1),
    },
    {
      title: '生成产品规范',
      content: <ProductSpecificationWordExport projectId={projectId} />,
      handleSubmit: async () => setCurrent(current + 1),
    },
  ];

  useEffect(() => {
    const loadCurrentStepData = async () => {
      if (steps[current].loadData) await steps[current].loadData();
    };
    loadCurrentStepData();
  }, [current]);

  const next = async () => {
    if (steps[current].handleSubmit) await steps[current].handleSubmit();
  };

  const prev = () => setCurrent(current - 1);

  return (
    <div>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Steps.Step key={index} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 24 }}>{steps[current].content}</div>
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        {current > 0 && <Button onClick={prev} style={{ marginRight: 8 }}>上一步</Button>}
        {current < steps.length - 1 && <Button type="primary" onClick={next}>下一步</Button>}
        {current === steps.length - 1 && <Button type="primary" onClick={() => message.success('流程完成')}>完成</Button>}
      </div>
    </div>
  );
};

export default StepForm;
