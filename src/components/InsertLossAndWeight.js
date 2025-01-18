import React, { useState } from 'react';
import { Form, InputNumber, Select, Checkbox } from 'antd';

const { Option } = Select;

const InsertLossAndWeight = () => {
  const [showInsertLoss, setShowInsertLoss] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);

  return (
    <>
      {/* 插入损耗特性选项 */}
      <Form.Item>
        <Checkbox checked={showInsertLoss} onChange={(e) => setShowInsertLoss(e.target.checked)}>
          填写插入损耗特性
        </Checkbox>
      </Form.Item>

      {/* 重量选项 */}
      <Form.Item>
        <Checkbox checked={showWeightInput} onChange={(e) => setShowWeightInput(e.target.checked)}>
          填写重量
        </Checkbox>
      </Form.Item>

      {showWeightInput && (
        <Form.Item name="weightValue" label="请输入重量" rules={[{ required: true, message: '请输入重量' }]}>
          <InputNumber min={1} max={1000} placeholder="请输入重量" />
          <Select defaultValue="g" style={{ width: 60, marginLeft: 8 }}>
            <Option value="g">g</Option>
            <Option value="kg">kg</Option>
          </Select>
        </Form.Item>
      )}

      {/* 环境特性复选框 */}
      <Form.Item name="environmentalTests" label="环境特性">
        <Checkbox.Group
          options={[
            { label: '盐雾', value: 'saltSpray' },
            { label: '霉菌', value: 'mold' },
            { label: '冲击', value: 'shock' },
            { label: '振动', value: 'vibration' },
          ]}
          defaultValue={['saltSpray', 'mold']}
        />
      </Form.Item>
    </>
  );
};

export default InsertLossAndWeight;
