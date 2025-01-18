import React, { useState } from 'react';
import { Form, Input, InputNumber, Select, Button, Checkbox } from 'antd';

const { Option } = Select;

const InsertLossAndWeight = () => {
  const [showInsertLoss, setShowInsertLoss] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [selectedEnvironmentalTests, setSelectedEnvironmentalTests] = useState([
    'saltSpray',
    'mold',
    'shock',
    'vibration',
  ]);

  // 环境特性选项
  const environmentalTests = [
    {
      label: '盐雾',
      value: 'saltSpray',
      description: '产品配合整机满足GJB150.11A-2009《军用装备实验环境试验方法第11部分：盐雾试验》的要求（盐雾24小时，干燥24小时为1个周期，共两周期）。',
    },
    {
      label: '霉菌',
      value: 'mold',
      description: '产品配合整机满足GJB150.10A-2009《军用装备实验环境试验方法第10部分：霉菌试验》的要求（霉菌环境条件下28天，防霉能力不低于0-2级）。',
    },
    {
      label: '冲击',
      value: 'shock',
      description: '产品配合整机满足GJB150.18A-2009《军用装备实验环境试验方法第18部分：冲击试验》的要求（程序I-功能性冲击实验后，仍能正常工作）。',
    },
    {
      label: '振动',
      value: 'vibration',
      description: '产品配合整机满足GJB150.16A-2009《军用装备实验环境试验方法第16部分：振动试验》的要求（按图C.3及表C.7执行，实验后仍能正常工作）。',
    },
  ];

  // 表单提交
  const onFinish = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {/* 插入损耗特性选项 */}
      <Form.Item>
        <Checkbox
          checked={showInsertLoss}
          onChange={(e) => setShowInsertLoss(e.target.checked)}
        >
          填写插入损耗特性
        </Checkbox>
      </Form.Item>

      {/* 重量选项 */}
      <Form.Item>
        <Checkbox
          checked={showWeightInput}
          onChange={(e) => setShowWeightInput(e.target.checked)}
        >
          填写重量
        </Checkbox>
      </Form.Item>

      {showWeightInput && (
        <Form.Item
          name="weightValue"
          label="请输入重量"
          rules={[{ required: true, message: '请输入重量' }]}
        >
          <Input.Group compact>
            <InputNumber min={1} max={1000} placeholder="≤50" />
            <Select defaultValue="g">
              <Option value="g">g</Option>
              <Option value="kg">kg</Option>
            </Select>
          </Input.Group>
        </Form.Item>
      )}

      {/* 环境特性复选框 */}
      <Form.Item name="environmentalTests" label="环境特性">
        <Checkbox.Group
          options={environmentalTests.map((test) => ({
            label: test.label,
            value: test.value,
          }))}
          defaultValue={selectedEnvironmentalTests}
          onChange={setSelectedEnvironmentalTests}
        />
      </Form.Item>

      {/* 动态显示选择的环境特性 */}
      {selectedEnvironmentalTests.map((testValue) => {
        const selectedTest = environmentalTests.find((test) => test.value === testValue);
        return (
          <Form.Item key={testValue} label={selectedTest.label}>
            <p>{selectedTest.description}</p>
          </Form.Item>
        );
      })}

      {/* 提交按钮 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InsertLossAndWeight;
