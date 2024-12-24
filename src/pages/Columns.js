import React, { useState, useEffect } from 'react';
import { Table, Typography, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import useTable from '../hooks/useTable';

const Columns = () => {
  const { tableId, tableName } = useParams(); // 获取路由参数
  const {
    columnsData,
     loading,
    fetchColumns,
  
  } = useTable();
  useEffect(() => {
    fetchColumns(tableId); // 初始化加载列数据
  }, []);


  // 定义表格列
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '列名称',
      dataIndex: 'columnName',
      key: 'columnName',
    },
    {
      title: '类属性',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: 'Java 类型',
      dataIndex: 'javaType',
      key: 'javaType',
    },
    {
      title: 'NULL',
      dataIndex: 'isNullable',
      key: 'isNullable',
      render: (text) => (text ? 'YES' : 'NO'), // 转换显示
    },
    {
      title: '键',
      dataIndex: 'columnKey',
      key: 'columnKey',
    },
    {
      title: '默认值',
      dataIndex: 'columnDefault',
      key: 'columnDefault',
    },
  ];

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <Typography.Title level={4}>
        {tableName} 列数据
      </Typography.Title>
      {loading ? (
        <Spin tip="加载中..." style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <Table
          columns={columns} // 表格列定义
          dataSource={columnsData} // 表格数据
          rowKey="id" // 数据唯一标识
          pagination={false} // 禁用分页
          locale={{ emptyText: '暂无数据' }} // 空数据时提示
        />
      )}
    </div>
  );
};

export default Columns;
