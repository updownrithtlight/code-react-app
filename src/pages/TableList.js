import React, { useEffect } from 'react';
import { Typography, Pagination } from 'antd';
import { useNavigate } from 'react-router-dom';
import useTable from '../hooks/useTable';
import SearchForm from '../components/SearchForm';
import ActionButtons from '../components/ActionButtons';
import DataTable from '../components/DataTable';

const TableList = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [queryParams, setQueryParams] = React.useState({
    tableName: '',
    schemaName: '',
  });

  const {
    tableData,
    pagination,
    loading,
    removeTable,
    generateCode,
    generateCodeFront,
    syncTableMetadata,
    fetchTables,
  } = useTable();

  useEffect(() => {
    fetchTables(pagination.current, pagination.pageSize, queryParams);
  }, [fetchTables, pagination.current, pagination.pageSize, queryParams]);

  const handleQueryParamChange = (key, value) => {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchTables(1, pagination.pageSize, queryParams);
  };

  const handleReadColumns = (tableId, tableName) => {
    navigate(`/columns/${tableId}/${tableName}`);
  };

  const handlePageChange = (page, pageSize) => {
    fetchTables(page, pageSize, queryParams); // 更新页码和每页条数
  };


    // 定义同步数据表的回调
    const handleSync = () => {
      syncTableMetadata()
        .then(() => {
          fetchTables(pagination.current, pagination.pageSize, queryParams);
        })
        .catch((err) => {
          console.error('同步数据表失败:', err);
        });
    };
  
    // 定义批量生成代码的回调
    const handleBatchGenerate = () => {
      console.log('塔利班',selectedRows)
      if (selectedRows.length === 0) {
        console.warn('请先选择数据表!');
        return;
      }
      generateCode(selectedRows)
        .then(() => {
          console.log('批量生成代码成功');
        })
        .catch((err) => {
          console.error('批量生成代码失败:', err);
        });
    };
    const onBatchGenerateFront = () => {
      console.log('塔利班',selectedRows)
      if (selectedRows.length === 0) {
        console.warn('请先选择数据表!');
        return;
      }
      generateCodeFront(selectedRows)
        .then(() => {
          console.log('批量生成代码成功');
        })
        .catch((err) => {
          console.error('批量生成代码失败:', err);
        });
    };

  return (
    <div style={{ padding: '20px' }}>
      <Typography.Title level={4}>表管理</Typography.Title>
      <SearchForm
        queryParams={queryParams}
        onQueryParamChange={handleQueryParamChange}
        onSearch={handleSearch}
      />
      <ActionButtons onSync={handleSync} onBatchGenerate={handleBatchGenerate} onBatchGenerateFront={onBatchGenerateFront} />
      <DataTable
        tableData={tableData}
        selectedRows={selectedRows}
        onSelectChange={setSelectedRows}
        onReadColumns={handleReadColumns}
        onDelete={removeTable}
        loading={loading}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
        <Pagination
          current={pagination.current}  // 当前页
          total={pagination.total}      // 数据总数
          pageSize={pagination.pageSize} // 每页条数
          onChange={handlePageChange}   // 页码变化时调用
          showSizeChanger               // 显示页面大小选择器
          pageSizeOptions={[10, 20, 50]} // 页面大小选项
          showQuickJumper               // 显示快速跳转
          showTotal={(total) => `共 ${total} 条数据`} // 展示总数
        />
      </div>
    </div>
  );
};

export default TableList;
