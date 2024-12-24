import React from 'react';
import { Form, Input, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const SearchForm = ({ queryParams, onQueryParamChange, onSearch }) => (
  <Form layout="inline" style={{ marginBottom: 16 }}>
    <Form.Item label="数据库名称">
      <Input
        placeholder="数据库名称"
        value={queryParams.schemaName}
        onChange={(e) => onQueryParamChange('schemaName', e.target.value)}
      />
    </Form.Item>
    <Form.Item label="表名称">
      <Input
        placeholder="表名称"
        value={queryParams.tableName}
        onChange={(e) => onQueryParamChange('tableName', e.target.value)}
      />
    </Form.Item>
    <Form.Item>
      <Button type="primary" onClick={onSearch} icon={<SyncOutlined />}>
        查询
      </Button>
    </Form.Item>
  </Form>
);

export default SearchForm;
