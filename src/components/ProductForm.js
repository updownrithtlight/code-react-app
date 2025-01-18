import React, { useState } from 'react';
import { Form, Button } from 'antd';
import TechnicalFeatures from './TechnicalFeatures';
import InsertLossAndWeight from './InsertLossAndWeight';

const ProductForm = () => {
  const [form] = Form.useForm();

  // 表单提交处理
  const onFinish = (values) => {
    console.log('表单提交的值:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
           {/* 插入损耗和重量部分 */}
      <InsertLossAndWeight form={form} />
      {/* 技术特点和使用注意事项部分 */}
      <TechnicalFeatures form={form} />

      {/* 提交按钮 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
