import React from 'react';
import { Form, Input, Select, DatePicker, Button, Switch } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const SearchDatabaseConnectionComponent = ({ queryParams, onQueryParamChange, onSearch, onReset }) => (
  <Form layout="inline" style={{ marginBottom: 16 }}>
    <Form.Item label="createdAt" key="createdAt">
        <DatePicker
          placeholder="请输入createdAt"
          value={queryParams.createdAt}
          onChange={(date, dateString) => onQueryParamChange('createdAt', dateString)}
        />
    </Form.Item>
    <Form.Item label="createdBy" key="createdBy">
        <Input
          placeholder="请输入createdBy"
          value={queryParams.createdBy}
          onChange={(e) => onQueryParamChange('createdBy', e.target.value)}
        />
    </Form.Item>

    <Form.Item label="name" key="name">
        <Input
          placeholder="请输入name"
          value={queryParams.name}
          onChange={(e) => onQueryParamChange('name', e.target.value)}
        />
    </Form.Item>
    <Form.Item label="password" key="password">
        <Input
          placeholder="请输入password"
          value={queryParams.password}
          onChange={(e) => onQueryParamChange('password', e.target.value)}
        />
    </Form.Item>
    <Form.Item label="updatedAt" key="updatedAt">
        <DatePicker
          placeholder="请输入updatedAt"
          value={queryParams.updatedAt}
          onChange={(date, dateString) => onQueryParamChange('updatedAt', dateString)}
        />
    </Form.Item>
    <Form.Item label="updatedBy" key="updatedBy">
        <Input
          placeholder="请输入updatedBy"
          value={queryParams.updatedBy}
          onChange={(e) => onQueryParamChange('updatedBy', e.target.value)}
        />
    </Form.Item>
    <Form.Item label="url" key="url">
        <Input
          placeholder="请输入url"
          value={queryParams.url}
          onChange={(e) => onQueryParamChange('url', e.target.value)}
        />
    </Form.Item>
    <Form.Item label="username" key="username">
        <Input
          placeholder="请输入username"
          value={queryParams.username}
          onChange={(e) => onQueryParamChange('username', e.target.value)}
        />
    </Form.Item>
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

export default SearchDatabaseConnectionComponent;
