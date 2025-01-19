import React, { useEffect, useState } from 'react';
import { Form, Select, Input, Row, Col } from 'antd';

const { Option } = Select;

const BasicInfoStep = ({ formData, setFormData }) => {
  const [form] = Form.useForm();
  const [customFields, setCustomFields] = useState({
    projectName: false,
  });

  useEffect(() => {
    console.log('你在变化吗',formData)
    if (formData && formData) {
      form.setFieldsValue(formData);
    }
  }, [formData]);

  const handleChange = (field, value) => {
    setCustomFields((prev) => ({
      ...prev,
      [field]: value === 'custom',
    }));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(changedValues, allValues) => setFormData(allValues)}
      style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '20px',
        background: '#fff',
        borderRadius: '8px',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <Row gutter={24}>
        {/* 项目 ID */}
        <Col span={12}>
          <Form.Item label="项目 ID" name="id">
            <Input disabled placeholder="自动生成的 ID" />
          </Form.Item>
        </Col>

        {/* 文件编号 */}
        <Col span={12}>
          <Form.Item
            label="文件编号"
            name="file_number"
            rules={[{ required: true, message: '请输入文件编号！' }]}
          >
            <Input placeholder="请输入文件编号" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        {/* 项目名称 */}
        <Col span={12}>
          <Form.Item
            label="项目名称"
            name="project_name"
            rules={[{ required: true, message: '请选择或输入项目名称！' }]}
          >
            <Select placeholder="请选择项目名称" onChange={(value) => handleChange('projectName', value)}>
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
        </Col>

        {/* 自定义项目名称 */}
        {customFields.projectName && (
          <Col span={12}>
            <Form.Item
              label="自定义项目名称"
              name="customProjectName"
              rules={[{ required: true, message: '请输入自定义项目名称！' }]}
            >
              <Input placeholder="请输入项目名称" />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row gutter={24}>
        {/* 型号 */}
        <Col span={12}>
          <Form.Item
            label="型号"
            name="project_model"
            rules={[{ required: true, message: '请输入型号！' }]}
          >
            <Input placeholder="请输入型号" />
          </Form.Item>
        </Col>

        {/* 产品类型 */}
        <Col span={12}>
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
        </Col>
      </Row>

      <Row gutter={24}>
        {/* 产品等级 */}
        <Col span={12}>
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
        </Col>

        {/* 产品编号 */}
        <Col span={12}>
          <Form.Item
            label="产品编号"
            name="product_number"
            rules={[{ required: true, message: '请输入产品编号！' }]}
          >
            <Input placeholder="请输入产品编号" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default BasicInfoStep;
