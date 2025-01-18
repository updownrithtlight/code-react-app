import React from 'react';
import { Form, Input, Select, Button, Table } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

const KitForm = () => {
  const [form] = Form.useForm();

  // 表头定义
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (text, record, index) => index + 1,
    },
    {
      title: '产品名称',
      dataIndex: 'productName',
      key: 'productName',
      render: (_, record) => (
        <Form.Item
          name={['items', record.key, 'productName']}
          rules={[{ required: true, message: '请选择产品名称' }]}
        >
          <Select placeholder="选择或输入产品名称" mode="combobox">
            <Option value="保险管">保险管</Option>
            <Option value="导电衬垫">导电衬垫</Option>
            <Option value="出厂检测报告">出厂检测报告</Option>
            <Option value="试验报告">试验报告</Option>
            <Option value="纸质合格证">纸质合格证</Option>
          </Select>
        </Form.Item>
      ),
    },
    {
      title: '产品代号',
      dataIndex: 'productCode',
      key: 'productCode',
      render: (_, record) => (
        <Form.Item
          name={['items', record.key, 'productCode']}
        >
          <Input placeholder="输入产品代号" />
        </Form.Item>
      ),
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (_, record) => (
        <Form.Item
          name={['items', record.key, 'quantity']}
          rules={[{ required: true, message: '请输入数量' }]}
        >
          <Input placeholder="输入数量（如 1 份）" />
        </Form.Item>
      ),
    },
    {
        title: '备注',
        dataIndex: 'remarks',
        key: 'remarks',
        render: (_, record) => (
          <Form.Item
            name={['items', record.key, 'remarks']}
            rules={[{ required: true, message: '备注' }]}
          >
            <Input placeholder="输入备注" />
          </Form.Item>
        ),
      },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, record, index) => (
        <MinusCircleOutlined
          onClick={() => handleRemoveRow(index)}
          style={{ color: 'red', marginLeft: 8 }}
        />
      ),
    },
  ];

  // 初始数据
  const [dataSource, setDataSource] = React.useState([
    { key: 0, productName: '', productCode: '', quantity: '' },
  ]);

  // 添加行
  const handleAddRow = () => {
    setDataSource([
      ...dataSource,
      { key: dataSource.length, productName: '', productCode: '', quantity: '' },
    ]);
  };

  // 删除行
  const handleRemoveRow = (index) => {
    const newData = dataSource.filter((_, i) => i !== index);
    setDataSource(newData);
  };

  // 表单提交
  const onFinish = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        rowKey="key"
      />
      <Button type="dashed" onClick={handleAddRow} style={{ width: '100%', marginTop: 16 }}>
        <PlusOutlined /> 添加行
      </Button>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ marginTop: 16 }}>
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default KitForm;
