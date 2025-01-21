import React from 'react';
import { Table, Button,  Switch,  } from 'antd';
import { DeleteOutlined, EyeOutlined,RedoOutlined , CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';


const { Column } = Table;

const UserTable = ({
  data,
  selectedRows,
  onSelectChange,
  onDelete,
  onReset,
  onReadColumns,
  loading,
  onStatusChange,
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

    <Column title="id" dataIndex="user_id" />
    <Column title="用户名" dataIndex="user_fullname" />
    <Column title="登录名" dataIndex="username" />
    <Column
        title="状态"
        dataIndex="status"
        render={(status,record) => (
          <Switch
            checked={status === "active"}
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<CloseCircleOutlined />}
            onChange={() => onStatusChange(record)}
            style={{
              backgroundColor: status === "active" ? "green" : "gray",
            }}
          />
        )}
      />
    <Column title="重置密码" 
       render={(text, record) => (
        <span>
         <Button type="link" icon={<RedoOutlined  />} danger onClick={() => onReset(record.user_id)} />
        
        </span>
      )}
    />
    <Column title="创建时间" dataIndex="created_at" />
    <Column
      title="操作"
      render={(text, record) => (
        <span>
         <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => onReadColumns(record)}
          />
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => onDelete(record.user_id)} />
        
        </span>
      )}
    />
  </Table>
);

export default UserTable;
