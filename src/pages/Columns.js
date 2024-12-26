import React, { useEffect } from 'react';
import { Table, Typography, Spin, message, Switch,Button } from 'antd';
import { useParams } from 'react-router-dom';
import useColumn from '../hooks/useColumn';

const Columns = () => {
  const { tableId, tableName } = useParams(); // 获取路由参数
  const {
    columnsData,
     loading,
    fetchColumns,
    updateColumnsBy,
    syncColumnsMetadata,
  } = useColumn();
  useEffect(() => {
    fetchColumns(tableId); // 初始化加载列数据
  }, []);

    // 切换开关状态
    const handleSwitchChange = async (record, field, checked) => {
      try {
        const updatedRecord = { ...record, [field]: checked }; // 更新指定字段
        await updateColumnsBy(tableId,updatedRecord); // 调用 API 更新数据
        message.success('保存成功');
      } catch (error) {
        message.error('保存失败，请重试');
      }
    };
    const handleSyncColumns = async () => {
      try {
        await syncColumnsMetadata(tableId,tableName); // 调用 API 更新数据
        message.success('保存成功');
      } catch (error) {
        message.error('保存失败，请重试');
      }
    };


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
      title: '标签名',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Java 类型',
      dataIndex: 'javaType',
      key: 'javaType',
    },
    {
      title: '数据输入类型',
      dataIndex: 'dataInputType',
      key: 'dataInputType',
    },
    {
      title: 'NULL',
      dataIndex: 'isNullable',
      key: 'isNullable',
      render: (text) => (text ? 'YES' : 'NO'), // 转换显示
    },
    {
      title: '主键',
      dataIndex: 'isPk',
      key: 'isPk',
    },
    {
      title: '插入字段',
      dataIndex: 'isInsert',
      key: 'isInsert',
      render: (text, record) => (
        <Switch
          checked={record.isInsert}
          onChange={(checked) => handleSwitchChange(record, 'isInsert', checked)}
        />
      ),
    },
    {
      title: '编辑字段',
      dataIndex: 'isEdit',
      key: 'isEdit',
      render: (text, record) => (
        <Switch
          checked={record.isEdit}
          onChange={(checked) => handleSwitchChange(record, 'isEdit', checked)}
        />
      ),
    },
    {
      title: '列表字段',
      dataIndex: 'isList',
      key: 'isList',
      render: (text, record) => (
        <Switch
          checked={record.isList}
          onChange={(checked) => handleSwitchChange(record, 'isList', checked)}
        />
      ),
    },
    {
      title: '查询字段',
      dataIndex: 'isQuery',
      key: 'isQuery',
      render: (text, record) => (
        <Switch
          checked={record.isQuery}
          onChange={(checked) => handleSwitchChange(record, 'isQuery', checked)}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: '20px', background: '#fff' }}>
      <Typography.Title level={4}>
        {tableName} 列数据     
        <Button  type="primary" onClick={() => handleSyncColumns()}>
          同步列属性
        </Button>
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
