import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined,EyeOutlined } from '@ant-design/icons';

const { Column } = Table;

const DataTable = ({
  tableData,
  selectedRows,
  onSelectChange,
  onEdit,
  onDelete,
  onReadColumns,
  loading,
}) => (
  <Table
    dataSource={tableData}
    rowKey="id"
    rowSelection={{
      selectedRowKeys: selectedRows,
      onChange: onSelectChange,
    }}
    pagination={false}
    loading={loading}
    locale={{ emptyText: '暂无数据' }}
  >
    <Column title="ID" dataIndex="id" />
    <Column title="表名称" dataIndex="tableName" />
    <Column title="类名称" dataIndex="className" />
    <Column title="库名称" dataIndex="schemaName" />
    <Column title="备注" dataIndex="remark" />
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
          <Button type="link" icon={<EyeOutlined />} onClick={() => onReadColumns(record.id, record.tableName)}>
            表结构
          </Button>
        </span>
      )}
    />
  </Table>
);

export default DataTable;
