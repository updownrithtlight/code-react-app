import React from 'react';
import { Table, Input, Form, Select } from 'antd';

const { Option } = Select;

const OutputPowerCharacteristics = () => {
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
            <Option value="%">%</Option>
            <Option value="mV">mV</Option>
            <Option value="%P0">%P0</Option>
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
          <Input placeholder="Enter Description" />
        </Form.Item>
      ),
    },
  ];

  // 表格数据（根据图片内容）
  const data = [
    {
      key: '1',
      parameter: '输出电压',
      minValue: 'Vo1',
      typicalValue: 'V1-0.5',
      maxValue: 'V1+0.5',
      defaultUnit: 'Vdc',
      description: '额定负载',
    },
    {
      key: '2',
      parameter: '输出电流',
      minValue: 'Vo2',
      typicalValue: 27.5,
      maxValue: 28.5,
      defaultUnit: 'Vdc',
      description: '全电流',
    },
    {
      key: '3',
      parameter: '电压调整率',
      minValue: 'Vo2',
      typicalValue: '--',
      maxValue: '±1',
      defaultUnit: '%',
      description: '全电压，满电流',
    },
    {
      key: '4',
      parameter: '负载调整率',
      minValue: 'Vo2',
      typicalValue: '--',
      maxValue: '±2.0',
      defaultUnit: '%',
      description: '标称输入电压，10%~100%负载',
    },
    {
      key: '5',
      parameter: '输出纹波与噪声',
      minValue: 'Vo2',
      typicalValue: '--',
      maxValue: 100,
      defaultUnit: 'mV',
      description: '额定负载，20MHz 带宽示波器',
    },
    {
      key: '6',
      parameter: '效率',
      minValue: '--',
      typicalValue: 84,
      maxValue: 88,
      defaultUnit: '%P0',
      description: '打嗝模式',
    },
    {
      key: '7',
      parameter: '输出过流保护',
      minValue: 110,
      typicalValue: '--',
      maxValue: '--',
      defaultUnit: '%P0',
    },
    {
      key: '8',
      parameter: '输出短路保护',
      minValue: '--',
      typicalValue: '--',
      maxValue: '有',
      defaultUnit: '--',
      description: '短路去除后自恢复',
    },
    {
      key: '9',
      parameter: '输出过压保护',
      minValue: '--',
      typicalValue: '--',
      maxValue: '有',
      defaultUnit: '--',
    },
  ];

  return (
    <Form
      name="output_power_form"
      layout="vertical"
      onFinish={(values) => console.log('Form Values:', values)}
    >
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        title={() => '电源输出特性'}
      />
      <Form.Item>
        <button type="submit" className="ant-btn ant-btn-primary">
          提交
        </button>
      </Form.Item>
    </Form>
  );
};

export default OutputPowerCharacteristics;
