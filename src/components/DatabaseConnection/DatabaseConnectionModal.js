import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, DatePicker, InputNumber, Button, Switch } from 'antd';

const DatabaseConnectionModal = ({
  visible,
  onClose,
  onSubmit,
  mode,
  initialValues,
  fields
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
    onSubmit(values);
    form.resetFields();
  };

  return (
    <Modal
      title={mode === 'edit' ? `更新DatabaseConnection` : `新建DatabaseConnection`}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} onFinish={handleFinish} layout="vertical">

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
          <Button type="primary" htmlType="submit">
          提交           
          </Button>
          <Button style={{ marginLeft: '10px' }} onClick={() => form.resetFields()}>
         重置
        </Button>

        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DatabaseConnectionModal;
