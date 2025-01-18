import React from 'react';
import { Table, Button } from 'antd';
import { FileExcelOutlined,DeleteOutlined, ProfileOutlined   } from '@ant-design/icons';

const { Column } = Table;

const ProjectTable = ({
  data,
  selectedRows,
  onSelectChange,
  onDelete,
  onEdit,
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
    <Column title="名称" dataIndex="project_name" />
    <Column title="型号" dataIndex="project_model" />
    <Column title="产品类型" dataIndex="project_type" />
    <Column title="文件编号" dataIndex="file_number" />
    <Column title="产品编号" dataIndex="product_number" />
    <Column title="产品等级" dataIndex="project_level" />
    <Column
      title="操作"
      render={(text, record) => (
        <span>
   
         <Button
            type="link"
            icon={<ProfileOutlined   />}
            onClick={() => onReadColumns(record)}
          />
           <Button type="link" icon={<FileExcelOutlined />} onClick={() => onEdit(record)}>
            物料表
          </Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => onDelete(record.id)} />
        
        </span>
      )}
    />
  </Table>
);

export default ProjectTable;
