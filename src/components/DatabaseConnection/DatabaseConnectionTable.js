import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';

const { Column } = Table;

const DatabaseConnectionTable = ({
  data,
  selectedRows,
  onSelectChange,
  onEdit,
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
    <Column title="createdAt" dataIndex="createdAt" />
    <Column title="createdBy" dataIndex="createdBy" />
    <Column title="id" dataIndex="id" />
    <Column title="name" dataIndex="name" />
    <Column title="password" dataIndex="password" />
    <Column title="updatedAt" dataIndex="updatedAt" />
    <Column title="updatedBy" dataIndex="updatedBy" />
    <Column title="url" dataIndex="url" />
    <Column title="username" dataIndex="username" />
    <Column
      title="操作"
      render={(text, record) => (
        <span>
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)}>
            编辑
          </Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => onDelete(record.id)}>
            删除
          </Button>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onReadColumns(record.id, record.name)}
          />
        </span>
      )}
    />
  </Table>
);

export default DatabaseConnectionTable;
