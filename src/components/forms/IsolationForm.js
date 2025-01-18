import React from 'react';
import { Table, Input, Form, Select } from 'antd';

const { Option } = Select;

const IsolationForm = () => {
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
          {record.options ? (
            <Select placeholder="Select Min Value">
              {record.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder="Enter Min" />
          )}
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
          {record.options ? (
            <Select placeholder="Select Typical Value">
              {record.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder="Enter Typical" />
          )}
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
          {record.options ? (
            <Select placeholder="Select Max Value">
              {record.options.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          ) : (
            <Input placeholder="Enter Max" />
          )}
        </Form.Item>
      ),
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: '10%',
      render: (_, record) => (
        <Form.Item name={['parameters', record.key, 'unit']} style={{ margin: 0 }}   initialValue={record.defaultUnit} // 设置默认值
>
          <Select placeholder="Select Unit" defaultValue={record.defaultUnit}>
            {record.parameter === '电压（持续）' || record.parameter === '介质耐电压' ? (
              <>
                <Option value="Vdc">Vdc</Option>
                <Option value="Vac">Vac</Option>
              </>
            ) : record.parameter === '电流（持续）' || record.parameter === '漏电流' ? (
              <>
                <Option value="A">A</Option>
                <Option value="mA">mA</Option>
              </>
            ): record.parameter === '工作频率' ?  (
                <>
                  <Option value="Hz">Hz</Option>
          
                </>
              )  : record.parameter === '绝缘电阻' ?  (
                <>
                  <Option value="MΩ">MΩ</Option>
          
                </>
              )  :(
              <Option value="--">--</Option>
            )}
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
              mode="combobox" // 允许手动输入
              options={record.descriptionOptions?.map((option) => ({ value: option }))} // 将选项映射为下拉选项
            />
          </Form.Item>
        ),
      }
      
  ];

  // 表格数据
  const data = [
    {
      key: '1',
      parameter: '介质耐电压',
      defaultUnit: 'Vdc',
      descriptionOptions: ['5s，输入/输出对壳，无现象'],
    },
    {
      key: '2',
      parameter: '绝缘电阻',
      defaultUnit: 'MΩ',
      descriptionOptions: ['500Vdc，输入、输出对壳；输入对输出VO2'],
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
        title={() => '隔离特性'}
      />
      <Form.Item>
        <button type="submit" className="ant-btn ant-btn-primary">
          提交
        </button>
      </Form.Item>
    </Form>
  );
};

export default IsolationForm;
