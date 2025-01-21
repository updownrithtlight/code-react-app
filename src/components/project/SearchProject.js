import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchProject = ({ queryParams, onQueryParamChange, onSearch, onReset }) => {
  // 用于动态控制“其他”选项的输入框显示
  const [customFields, setCustomFields] = useState({
    projectName: false,
    working_temperature: false,
    storage_temperature: false,
  });

  // 处理选择变化
  const handleChange = (field, value) => {
    onQueryParamChange(field, value);
    setCustomFields((prev) => ({
      ...prev,
      [field]: value === 'custom',
    }));
  };

  return (
    <Form layout="inline" style={{ marginBottom: 16 }}>
      {/* 名称 */}
 <Form.Item
        label="名称"
        name="project_name"
        rules={[{ required: true, message: '请选择或输入项目名称！' }]}
        style={{ width: 300 }}  // 设置宽度

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
      <Form.Item label="型号" key="project_model"      style={{ width: 200 }}  // 设置宽度
      >
        <Input
          placeholder="请输入型号"
          value={queryParams.project_model}
          onChange={(e) => onQueryParamChange('project_model', e.target.value)}
        />
      </Form.Item>

      {/* 产品类型 */}
      <Form.Item label="产品类型" key="project_type"      style={{ width: 180 }}  // 设置宽度
      >
        <Select
          placeholder="请选择产品类型"
          value={queryParams.project_type}
          onChange={(value) => handleChange('projectType', value)}
        >
          <Option value="电源">电源</Option>
          <Option value="信号">信号</Option>
          <Option value="电源、信号">电源、信号</Option>
          <Option value="无">无</Option>
         </Select>
      </Form.Item>

      {customFields.projectType && (
        <Form.Item key="custom_project_type">
          <Input
            placeholder="请输入自定义产品类型"
            value={queryParams.custom_project_type}
            onChange={(e) => onQueryParamChange('custom_project_type', e.target.value)}
          />
        </Form.Item>
      )}


     

      {/* 查询和重置按钮 */}
      <Form.Item>
        <Button type="primary" onClick={onSearch} icon={<SyncOutlined />}>
          查询
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchProject;
