import React, { useEffect } from 'react';
import { Form, Input, Select, DatePicker, InputNumber, Button, Switch } from 'antd';

const DatabaseConnectionPage = ({
  mode,           // "edit" 或 "create"
  initialValues,  // 初始表单值
  fields,         // 动态表单字段配置
  onSubmit,       // 表单提交回调
  onCancel        // 取消回调
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (mode === 'edit' && initialValues) {
      form.setFieldsValue(initialValues); // 预填充表单
    } else {
      form.resetFields(); // 清空表单
    }
  }, [mode, initialValues, form]);

  const handleFinish = (values) => {
    onSubmit(values); // 调用回调提交表单
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto', background: '#fff', borderRadius: 8 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 24 }}>
          新建DatabaseConnection
      </h1>
      <Form form={form} onFinish={handleFinish} layout="vertical">
          <Form.Item
            label="createdAt"
            name="createdAt"
            rules={[
            ]}
          >
              <DatePicker style="width: 100%;" />
          </Form.Item>
          <Form.Item
            label="createdBy"
            name="createdBy"
            rules={[
            ]}
          >
              <Input placeholder="请输入createdBy" />
          </Form.Item>
          <Form.Item
            label="id"
            name="id"
            rules={[
                { required: true, message: '请输入id' }
            ]}
          >
              <InputNumber placeholder="请输入id" style="width: 100%;" />
          </Form.Item>
          <Form.Item
            label="name"
            name="name"
            rules={[
                { required: true, message: '请输入name' }
            ]}
          >
              <Input placeholder="请输入name" />
          </Form.Item>
          <Form.Item
            label="password"
            name="password"
            rules={[
                { required: true, message: '请输入password' }
            ]}
          >
              <Input placeholder="请输入password" />
          </Form.Item>
          <Form.Item
            label="updatedAt"
            name="updatedAt"
            rules={[
            ]}
          >
              <DatePicker style="width: 100%;" />
          </Form.Item>
          <Form.Item
            label="updatedBy"
            name="updatedBy"
            rules={[
            ]}
          >
              <Input placeholder="请输入updatedBy" />
          </Form.Item>
          <Form.Item
            label="url"
            name="url"
            rules={[
                { required: true, message: '请输入url' }
            ]}
          >
              <Input placeholder="请输入url" />
          </Form.Item>
          <Form.Item
            label="username"
            name="username"
            rules={[
                { required: true, message: '请输入username' }
            ]}
          >
              <Input placeholder="请输入username" />
          </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
              提交
          </Button>
          <Button onClick={onCancel}>取消</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default DatabaseConnectionPage;
