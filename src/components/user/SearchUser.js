import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const { Option } = Select;

const SearchUser = ({ queryParams, onQueryParamChange, onSearch, onReset }) => {

  return (
    <Form layout="inline" style={{ marginBottom: 16 }}>
      {/* 名称 */}
    <Form.Item
        label="用户名"
        name="user_fullname"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
      <Input placeholder="请输入用户名！"  value={queryParams.user_fullname}
          onChange={(e) => onQueryParamChange('user_fullname', e.target.value)}
        />
      </Form.Item>

      {/* 型号 */}
      <Form.Item label="登录名" key="username">
        <Input
          placeholder="请输入登录名"
          value={queryParams.username}
          onChange={(e) => onQueryParamChange('username', e.target.value)}
        />
      </Form.Item>
 
      <Form.Item label="状态" key="status"    style={{ width: 180 }}  // 设置宽度
      >
        <Select
          placeholder="请选择状态"
          value={queryParams.status}
          onChange={(value) => onQueryParamChange('status', value)}
        >
          <Option value="active">启用</Option>
          <Option value="disabled">禁用</Option>
         </Select>
      </Form.Item>

      {/* 查询和重置按钮 */}
      <Form.Item>
        <Button type="primary" onClick={onSearch} icon={<SyncOutlined />}>
          查询
        </Button>
        <Button style={{ marginLeft: 8 }} onClick={onReset}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SearchUser;
