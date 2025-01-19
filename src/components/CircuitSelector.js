import React, { useState } from 'react';
import { Form, TreeSelect, Card, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const circuitData = [
  {
    id: 70,
    title: '直流',
    children: [
      { id: 75, title: '10电路（直流一级滤波）', img: '/circuits/1.png' },
      { id: 76, title: '12电路（直流一级滤波）', img: '/circuits/2.png' },
      { id: 77, title: '14电路（直流一级滤波）', img: '/circuits/3.png' },
      { id: 78, title: '16电路（直流一级滤波）', img: '/circuits/4.png' },
      { id: 79, title: '18电路（直流一级滤波）', img: '/circuits/5.png' },
      { id: 80, title: '20电路（直流一共一差滤波）', img: '/circuits/6.png' },
      { id: 81, title: '22电路（直流两共滤波）', img: '/circuits/7.png' },
      { id: 82, title: '24电路（直流一共单差滤波）', img: '/circuits/9.png' },
      { id: 83, title: '32电路（直流两共一差滤波）', img: '/circuits/9.png' },
    ],
  },
  {
    id: 71,
    title: '交流单相',
    children: [
      { id: 84, title: '11电路（交流一级滤波）', img: '/circuits/10.png' },
      { id: 85, title: '13电路（交流一级滤波）', img: '/circuits/11.png' },
      { id: 86, title: '17电路（交流一级滤波）', img: '/circuits/12.png' },
      { id: 87, title: '21电路（交流一共一差滤波）', img: '/circuits/13.png' },
      { id: 88, title: '23电路（交流两共滤波）', img: '/circuits/14.png' },
      { id: 89, title: '33电路（交流两共一差滤波）', img: '/circuits/15.png' },
    ],
  },
  {
    id: 72,
    title: '交流三相三线',
    children: [
      { id: 90, title: '53电路（一级滤波）', img: '/circuits/16.png' },
      { id: 91, title: '63电路（一共一差滤波）', img: '/circuits/17.png' },
      { id: 92, title: '69电路（一共一差滤波）', img: '/circuits/18.png' },
    ],
  },
  {
    id: 73,
    title: '交流三相四线',
    children: [
      { id: 93, title: '55电路（一级滤波）', img: '/circuits/19.png' },
      { id: 94, title: '59电路（一级滤波）', img: '/circuits/20.png' },
      { id: 95, title: '65电路（一共一差滤波）', img: '/circuits/21.png' },
    ],
  },
  {
    id: 74,
    title: '脉冲群抑制',
    children: [
      { id: 96, title: '72电路（三差滤波）', img: '/circuits/22.png' },
    ],
  },
];
const CircuitSelector = () => {
    const [selectedCircuit, setSelectedCircuit] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
  
    // 生成树形数据
    const treeData = circuitData.map((parent) => ({
      title: parent.title,
      value: parent.id,
      children: parent.children.map((child) => ({
        title: child.title,
        value: child.id,
      })),
    }));
  
    // 处理电路图选择
    const handleCircuitChange = (value) => {
      const selected = circuitData
        .flatMap((parent) => parent.children || [])
        .find((c) => c.id === value);
      setSelectedCircuit(selected);
      setUploadedImage(null); // 清除上传的图片
    };
  
    // 处理图片上传
    const handleUpload = (file) => {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
        setSelectedCircuit(null); // 清除已选电路图
      };
      reader.readAsDataURL(file);
      return false; // 阻止自动上传
    };
  
    // 表单提交
    const onFinish = (values) => {
      console.log('Selected Circuit:', values);
    };
  
    return (
      <Form onFinish={onFinish} layout="vertical">
        {/* 树形选择器 */}
        <Form.Item
          name="circuitType"
          label="选择滤波电路类型"
          rules={[{ required: true, message: '请选择一个滤波电路类型或上传电路图' }]}
        >
          <TreeSelect
            style={{ width: '100%' }}
            treeData={treeData}
            placeholder="请选择电路类型"
            treeDefaultExpandAll
            onChange={handleCircuitChange}
          />
        </Form.Item>
  
        {/* 图片上传 */}
        <Form.Item label="或上传手绘电路图">
          <Upload
            beforeUpload={handleUpload}
            listType="picture"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>点击上传手绘电路图</Button>
          </Upload>
        </Form.Item>
  
        {/* 图片预览 */}
        {(selectedCircuit || uploadedImage) && (
          <Card
            title="电路图预览"
            style={{ marginTop: 20 }}
            cover={
              <img
                alt="电路图"
                src={uploadedImage || selectedCircuit?.img}
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  objectFit: 'contain',
                }}
              />
            }
          >
            <p>您选择的电路类型：{selectedCircuit?.title || '手绘电路图'}</p>
          </Card>
        )}
  
        {/* 提交按钮 */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
  export default CircuitSelector;