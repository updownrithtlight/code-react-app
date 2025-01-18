import React, { useEffect, useState } from 'react';
import { Steps, Button, message } from 'antd';
import BasicInfoStep from './BasicInfoStep';
import DynamicForm from '../DynamicForm'
import KitForm from '../KitForm'
import StructureDimensions from '../StructureDimensions'
import CircuitSelector from '../../pages/CircuitSelector'
import ProductForm from '../ProductForm'
import TechnicalManualWordExport from '../TechnicalManualWordExport'
import ProductSpecificationWordExport from '../ProductSpecificationWordExport'
import InspectionForm from '../forms/InspectionForm'
import useProjects from '../../hooks/useProject'; // 调用封装的 Hook
import useProjectField from '../../hooks/useProjectField'; // 调用封装的 Hook
import useFieldDefinition from '../../hooks/useFieldDefinition'; // 调用封装的 Hook

const StepForm = ({ id }) => {
  const [current, setCurrent] = useState(0);
  const [completeRequirementsParentId, setCompleteRequirementsParentId] = useState(0);
  const [structureDimensionsParentId, setStructureDimensionsParentId] = useState(0);
  const [formData, setFormData] = useState({
    basicInfo: {},
    sections: [],
    images: [],
  });
  const [productOptions, setProductOptions] = useState([]); // 定义 productOptions
  const [kitData, setKitFormData] = useState({});

  // 从 useProjects Hook 获取后端数据操作方法
  const { fetchById, save, } = useProjects();
  const { fetchFieldDefinitionById } = useFieldDefinition();
  const {     
    fetchProjectFieldsByProjectIdParentId,
    saveProjectFieldData,
    deleteProjectFieldById,
   } = useProjectField();
  const [projectId, setProjectId] = useState(id || null); // 如果没有 id，则为新建项目

  const handleDeleteRow = async (fieldId, index) => {
    try {
        if (fieldId) {
            console.log(`Deleting field with ID: ${fieldId} from backend...`);
            await deleteProjectFieldById(projectId,fieldId); // ✅ 调用 API 删除后端数据
        }

        // **前端同步更新 kitData**
        const updatedData = kitData.filter((_, i) => i !== index);
        console.log("Updated kitData after delete:", updatedData);

        setKitFormData(updatedData); // ✅ 确保 kitData 仍然是数组
    } catch (error) {
        console.error("Delete failed:", error);
        message.error("删除失败，请重试");
    }
};


  // 定义表单步骤
  const steps = [
    {
      title: '基本信息',
      content: (
        <BasicInfoStep
          formData={formData}
          setFormData={(data) => setFormData({ ...formData, basicInfo: data })}
        />
      ),
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
           setFormData((prevData) => ({
            ...prevData,
            basicInfo: response.data,
          }));
        }
      },
      handleSubmit: async () => {
        try {
          const response = await save({
            ...formData.basicInfo,
            projectId,
          });
        if (!projectId) {
          setProjectId(response.data.projectId); // 第一次保存时获取 projectId
          }
          message.success('基本信息保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    {
      title: '技术参数',
      content: (
        <DynamicForm  projectId={projectId}
            />
      ),
      handleSubmit: async () => {
        setCurrent(current + 1);
      },
    },
    {
      title: '齐套要求',
      content: (
        <KitForm 
          kitData={kitData}
          setKitFormData={(data) => setKitFormData({data })}
          productOptions={productOptions}  // 传递 productOptions
          parentId={completeRequirementsParentId}
          projectId={projectId}
          onDeleteRow={handleDeleteRow} // ✅ 传递删除方法

        />
      ),
      loadData: async () => {
        if (projectId) {
          const  singledata= await fetchFieldDefinitionById('complete_requirements');
 
          setCompleteRequirementsParentId(singledata.data.id)
          const options = singledata.data.children.map(item => ({
            id: item.id,
            value: item.field_name,  // 这里用 field_name 作为 Select 的值
            label: item.field_name,  // 显示的文本
            code: item.code,         // 额外属性
            parent_id: item.parent_id, 
          }));
          setProductOptions(options);
          const response = await fetchProjectFieldsByProjectIdParentId(projectId,singledata.data.id);
          console.log('response fetchProjectFieldsByProjectIdParentId',response.data)
          setKitFormData(response.data);
    
        }
      },
      handleSubmit: async () => {
        try {
          const saveData = Array.isArray(kitData) ? kitData : Array.isArray(kitData.data) ? kitData.data : [];

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
          formData={formData}
          setFormData={(data) => setFormData({ ...formData, sections: data })}
        />
      ),
      loadData: async () => {
        if (projectId) {
          const  singledata= await fetchFieldDefinitionById('structure_dimensions');
          console.log('test singledata',singledata.data.children)
          setStructureDimensionsParentId(singledata.data.id)
          const options = singledata.data.children.map(item => ({
            id: item.id,
            value: item.field_name,  // 这里用 field_name 作为 Select 的值
            label: item.field_name,  // 显示的文本
            code: item.code,         // 额外属性
            parent_id: item.parent_id, 
          }));
          setProductOptions(options);
          const response = await fetchProjectFieldsByProjectIdParentId(projectId,singledata.data.id);
          setKitFormData(() => ({
             basicInfo: response.data,
          }));
          console.log('init',kitData)
        }
      },
      handleSubmit: async () => {
        try {
        
          await saveProjectFieldData(kitData.data.items);
          message.success('保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    {
      title: '电路图',
      content: (
        <CircuitSelector
          formData={formData}
          setFormData={(data) => setFormData({ ...formData, sections: data })}
        />
      ),
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
          setFormData((prevData) => ({
            ...prevData,
            sections: response.data.sections,
          }));
        }
      },
      handleSubmit: async () => {
        try {
          await save({
            projectId,
            sections: formData.sections,
          });
          message.success('文档标题和内容保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },

    {
      title: '插入损耗特性/重量/环境特性',
      content: (
        <ProductForm
          formData={formData}
          setFormData={(data) => setFormData({ ...formData, sections: data })}
        />
      ),
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
          setFormData((prevData) => ({
            ...prevData,
            sections: response.data.sections,
          }));
        }
      },
      handleSubmit: async () => {
        try {
          await save({
            projectId,
            sections: formData.sections,
          });
          message.success('文档标题和内容保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },

    {
      title: "生成技术说明书",
      content: <TechnicalManualWordExport projectId={projectId} />,
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
          setFormData((prevData) => ({
            ...prevData,
            sections: response.data.sections,
          }));
        }
      },
      handleSubmit: async () => {
        try {
          await save({
            projectId,
            sections: formData.sections,
          });
          message.success('文档标题和内容保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    {
      title: '试验项目',
      content: (
        <InspectionForm
          fprojectId={projectId}
        />
      ),
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
          setFormData((prevData) => ({
            ...prevData,
            sections: response.data.sections,
          }));
        }
      },
      handleSubmit: async () => {
        try {
          await save({
            projectId,
            sections: formData.sections,
          });
          message.success('文档标题和内容保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },

    },

    
    {
      title: "生成产品规范",
      content: <ProductSpecificationWordExport projectId={projectId} />,
      loadData: async () => {
        if (projectId) {
          const response = await fetchById(projectId);
          setFormData((prevData) => ({
            ...prevData,
            sections: response.data.sections,
          }));
        }
      },
      handleSubmit: async () => {
        try {
          await save({
            projectId,
            sections: formData.sections,
          });
          message.success('文档标题和内容保存成功');
          setCurrent(current + 1);
        } catch (error) {
          message.error('提交失败，请重试');
        }
      },
    },
    
       
  ];

  // 加载当前步骤的已保存数据
  useEffect(() => {
    const loadCurrentStepData = async () => {
      const currentStep = steps[current];
      if (currentStep.loadData) {
        await currentStep.loadData();
      }
    };
    loadCurrentStepData();
  }, [current]);

  // 点击“下一步”时提交当前步骤数据到后端
  const next = async () => {
    const currentStep = steps[current];
    if (currentStep.handleSubmit) {
      await currentStep.handleSubmit(); // 调用当前步骤的提交逻辑
    }
  };

  // 返回上一步
  const prev = () => {
    setCurrent(current - 1);
  };

  // 完成表单并生成 Word 文档
  const handleFinish = async () => {
    try {
      // 提交所有数据到后端，生成 Word 文档
      await save({
        projectId,
        ...formData,
      });
      message.success('文档生成成功');
    } catch (error) {
      message.error('文档生成失败');
    }
  };

  return (
    <div>
      <Steps current={current}>
        {steps.map((item, index) => (
          <Steps.Step key={index} title={item.title} />
        ))}
      </Steps>
      <div style={{ marginTop: 24 }}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={handleFinish}>
            完成
          </Button>
        )}
        {current > 0 && (
          <Button style={{ marginLeft: 8 }} onClick={prev}>
            上一步
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
