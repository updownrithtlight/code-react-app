import React from 'react';
import { Table, Input, Form, Select } from 'antd';

const { Option } = Select;

const InputForm = () => {
  // 表头定义
  const columns = [
    {
      title: '项目',
      dataIndex: 'parameter',
      key: 'parameter',
      width: '20%',
    },
    {
      title: '最小',
      dataIndex: 'minValue',
      key: 'minValue',
      width: '15%',
      render: (_, record) => (
        <Form.Item name={['parameters', record.key, 'minValue']} style={{ margin: 0 }}>
          <Input placeholder="Enter Min" />
        </Form.Item>
      ),
    },
    {
      title: '典型',
      dataIndex: 'typicalValue',
      key: 'typicalValue',
      width: '15%',
      render: (_, record) => (
        <Form.Item name={['parameters', record.key, 'typicalValue']} style={{ margin: 0 }}>
          <Input placeholder="Enter Typical" />
        </Form.Item>
      ),
    },
    {
      title: '最大',
      dataIndex: 'maxValue',
      key: 'maxValue',
      width: '15%',
      render: (_, record) => (
        <Form.Item name={['parameters', record.key, 'maxValue']} style={{ margin: 0 }}>
          <Input placeholder="Enter Max" />
        </Form.Item>
      ),
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
      render: (_, record) => (
        <Form.Item name={['parameters', record.key, 'unit']} style={{ margin: 0 }}>
          <Select placeholder="Select Unit" defaultValue={record.defaultUnit}>
            <Option value="Vdc">Vdc</Option>
            <Option value="A">A</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: '说明',
      dataIndex: 'description',
      key: 'description',
      width: '25%',
      render: (_, record) => (
        <Form.Item name={['parameters', record.key, 'description']} style={{ margin: 0 }}>
          <Select
            placeholder="Select or Enter Description"
            mode="combobox"
            options={record.descriptionOptions?.map((option) => ({ value: option }))}
          />
        </Form.Item>
      ),
    },
  ];

  // 表格数据（根据图片内容）
  const data = [
    {
      key: '1',
      parameter: '输入电压',
      minValue: 10,
      typicalValue: 28,
      maxValue: 36,
      defaultUnit: 'Vdc',
      descriptionOptions: ['正常输入电压范围'],
    },
    {
      key: '2',
      parameter: '输入过压浪涌',
      minValue: '--',
      typicalValue: 50,
      maxValue: 80,
      defaultUnit: 'Vdc',
      descriptionOptions: ['80V/50ms 过压浪涌，1次/min，共5次，设备正常输出，需外加储能电容'],
    },
    {
      key: '3',
      parameter: '输入尖峰电压',
      minValue: '--',
      typicalValue: '--',
      maxValue: 600,
      defaultUnit: 'Vdc',
      descriptionOptions: ['在正常供电5min后，尖峰电压时间10us，各重复5次，每次间隔1min，正常工作'],
    },
    {
      key: '4',
      parameter: '输入欠压浪涌',
      minValue: 8,
      typicalValue: '--',
      maxValue: '--',
      defaultUnit: 'Vdc',
      descriptionOptions: ['8V/50ms 欠压浪涌，1次/min，共5次，设备正常输出，需外加储能电容'],
    },
    {
      key: '5',
      parameter: '输入电压中断',
      minValue: '--',
      typicalValue: '--',
      maxValue: '--',
      defaultUnit: 'Vdc',
      descriptionOptions: ['输入电压中断50ms保持正常输出，需外加储能电容'],
    },
    {
      key: '6',
      parameter: '输入电流抑制',
      minValue: '--',
      typicalValue: '--',
      maxValue: 12,
      defaultUnit: 'A',
      descriptionOptions: ['正常输入电流范围'],
    },
    {
      key: '7',
      parameter: '输入防反接保护',
      minValue: -40,
      typicalValue: '--',
      maxValue: '--',
      defaultUnit: 'Vdc',
      descriptionOptions: ['输入正负线反接，不损坏'],
    },
  ];

  return (
    <Form
      name="power_form"
      layout="vertical"
      onFinish={(values) => console.log('Form Values:', values)}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        title={() => '电源输入特性'}
      />
      <Form.Item>
        <button type="submit" className="ant-btn ant-btn-primary">
          提交
        </button>
      </Form.Item>
    </Form>
  );
};

export default InputForm;
