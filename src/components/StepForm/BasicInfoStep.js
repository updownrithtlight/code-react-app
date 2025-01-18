import React, { useEffect, useState } from 'react';
import { Form, Select, Input } from 'antd';

const { Option } = Select;

const BasicInfoStep = ({ formData, setFormData }) => {
  const [form] = Form.useForm(); // 获取表单实例
  const [customFields, setCustomFields] = useState({
    projectName: false,
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
      [field]: value === 'custom', // 选择“其他”时，显示输入框
    }));
  };

  return (
    <Form
      form={form} // 绑定表单实例
      layout="vertical"
      onValuesChange={(changedValues, allValues) => setFormData(allValues)}
    >
      {/* 项目ID */}
      <Form.Item label="ID" name="id">
        <Input disabled placeholder="自动生成的ID" />
      </Form.Item>

      {/* 项目名称 */}
      <Form.Item
        label="名称"
        name="project_name"
        rules={[{ required: true, message: '请选择或输入项目名称！' }]}
      >
        <Select
          placeholder="请选择项目名称"
          onChange={(value) => handleChange('project_name', value)}
        >
          <Option value="电源滤波器">电源滤波器</Option>
          <Option value="电源滤波组件">电源滤波组件</Option>
          <Option value="一体化综合滤波组件">一体化综合滤波组件</Option>
          <Option value="EMC级AC-DC电源组件">EMC级AC-DC电源组件</Option>
          <Option value="EMC级DC-DC电源组件">EMC级DC-DC电源组件</Option>
          <Option value="电磁加固型适配器">电磁加固型适配器</Option>
          <Option value="军用直流过欠压浪涌抑制器">军用直流过欠压浪涌抑制器</Option>
          <Option value="军用一体化滤波和浪涌抑制组件">军用一体化滤波和浪涌抑制组件</Option>
          <Option value="一体化无源谐波滤波组件">一体化无源谐波滤波组件</Option>
          <Option value="一体化有源谐波滤波组件">一体化有源谐波滤波组件</Option>
          <Option value="电源模块">电源模块</Option>
          <Option value="custom">其他</Option>
        </Select>
      </Form.Item>

      {customFields.projectName && (
        <Form.Item
          name="customProjectName"
          rules={[{ required: true, message: '请输入自定义项目名称！' }]}
        >
          <Input placeholder="请输入项目名称" />
        </Form.Item>
      )}

      {/* 型号 */}
      <Form.Item
        label="型号"
        name="project_model"
        rules={[{ required: true, message: '请输入型号！' }]}
      >
        <Input placeholder="请输入型号" />


      </Form.Item>

      {/* 产品类型 */}
      <Form.Item
        label="产品类型"
        name="project_type"
        rules={[{ required: true, message: '请选择产品类型！' }]}
      >
        <Select placeholder="请选择产品类型">
          <Option value="电源">电源</Option>
          <Option value="信号">信号</Option>
          <Option value="电源、信号">电源、信号</Option>
          <Option value="无">无</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="产品等级"
        name="project_level"
        rules={[{ required: true, message: '请选择产品等级！' }]}
      >
      <Select placeholder="请选择产品等级！">
          <Option value="J">J</Option>
          <Option value="T">T</Option>
          <Option value="K">K</Option>
          <Option value="S">S</Option>
        </Select>
      </Form.Item>
      {/* 文件编号 */}
     <Form.Item
        label="文件编号"
        name="file_number"
        rules={[{ required: true, message: '请输入文件编号！' }]}
      >
        <Input placeholder="请输入文件编号" />
      </Form.Item>

          {/* 产品编号 */}
     <Form.Item
        label="产品编号"
        name="product_number"
        rules={[{ required: true, message: '请输入产品编号！' }]}
      >
        <Input placeholder="请输入产品编号" />
      </Form.Item>

      
    </Form>
  );
};

export default BasicInfoStep;
