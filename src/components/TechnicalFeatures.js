import React, { useState } from 'react';
import { Form, Button } from 'antd';
import NoticeSelection from './NoticeSelection';
import ProductTechnicalFeatures from './ProductTechnicalFeatures';

const TechnicalFeatures = ({projectId}) => {
  const [form] = Form.useForm();

  // 表单提交处理
  const onFinish = (values) => {
    console.log('表单提交的值:', projectId);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
           {/* 插入损耗和重量部分 */}
      <ProductTechnicalFeatures projectId={projectId}  />
      {/* 技术特点和使用注意事项部分 */}
      <NoticeSelection projectId={projectId}  />
    </Form>
  );
};

export default TechnicalFeatures;
