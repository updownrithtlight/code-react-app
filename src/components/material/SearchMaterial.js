import React from 'react';
import { Form, Input, Button } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

const SearchMaterial = ({ queryParams, onQueryParamChange, onSearch, onReset }) => {

  return (
    <Form layout="inline" style={{ marginBottom: 16 }}>
      {/* 名称 */}
    <Form.Item
        label="物料代码"
        name="material_code"
        rules={[{ required: true, message: '请输入物料代码！' }]}
      >
      <Input placeholder="请输入物料代码！"  value={queryParams.material_code}
          onChange={(e) => onQueryParamChange('material_code', e.target.value)}
        />
      </Form.Item>

      {/* 型号 */}
      <Form.Item label="物料名称" key="material_name">
        <Input
          placeholder="请输入物料名称"
          value={queryParams.material_name}
          onChange={(e) => onQueryParamChange('material_name', e.target.value)}
        />
      </Form.Item>
     {/* 型号 */}
      <Form.Item label="型号规格" key="model_specification">
        <Input
          placeholder="请输入物料名称"
          value={queryParams.model_specification}
          onChange={(e) => onQueryParamChange('model_specification', e.target.value)}
        />
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

export default SearchMaterial;
