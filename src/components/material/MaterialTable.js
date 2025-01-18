import React from 'react';
import { Table, Button } from 'antd';
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Column } = Table;

const MaterialTable = ({
  data,
  selectedRows,
  onSelectChange,
  onDelete,
  onReadColumns,
  loading,
}) => (
  <Table
    dataSource={data}
    rowKey="id"
    rowSelection={{
      selectedRowKeys: selectedRows,
      onChange: onSelectChange,
    }}
    pagination={false}
    loading={loading}
    locale={{ emptyText: '暂无数据' }}
  >

    <Column title="id" dataIndex="id" />
    <Column title="物料代码" dataIndex="material_code" />
    <Column title="物料名称" dataIndex="material_name" />
    <Column title="型号规格" dataIndex="model_specification" />
    <Column title="计量单位" dataIndex="unit" />
    <Column
      title="操作"
      render={(text, record) => (
        <span>
         <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onReadColumns(record)}
          />
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => onDelete(record.id)} />
        
        </span>
      )}
    />
  </Table>
);

export default MaterialTable;
