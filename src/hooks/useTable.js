
// src/hooks/useTable.js
import { useState,  useCallback } from 'react';
import { getTables, deleteTable, syncMetadata, generateBaseCodeFrontFor,generateCodeForIds,generateCodeFrontForIds,  } from '../api/talbe/TableService';

const useTable = () => {
  const [tableData, setTableData] = useState([]); // 表格数据
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误信息

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取表格数据
  const fetchTables = useCallback(async (page = 1, size = 10, queryParams = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTables(page, size, queryParams);
      setTableData(data.data.content || []); // 假设后端返回 items 和 total 字段
      setPagination((prev) => ({
        ...prev,
        current: page,
        pageSize: size,
        total: data.data.totalElements || 0,
      }));
    } catch (err) {
      setError(err.message || 'Failed to fetch table data.');
    } finally {
      setLoading(false);
    }
  }, []);

 

  // 删除表
  const removeTable = useCallback(async (tableId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteTable(tableId);
      fetchTables(pagination.current, pagination.pageSize); // 刷新数据
    } catch (err) {
      setError(err.message || 'Failed to delete table.');
    } finally {
      setLoading(false);
    }
  }, [pagination, fetchTables]);

  // 同步元数据
  const syncTableMetadata = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await syncMetadata();
      fetchTables(pagination.current, pagination.pageSize); // 刷新数据
    } catch (err) {
      setError(err.message || 'Failed to sync metadata.');
    } finally {
      setLoading(false);
    }
  }, [pagination, fetchTables]);

  // 生成代码
  const generateCode = useCallback(async (tableIds) => {
    setLoading(true);
    setError(null);
    try {
      const response= await generateCodeForIds(tableIds);
    } catch (err) {
      setError(err.message || 'Failed to generate code.');
    } finally {
      setLoading(false);
    }
  }, []);


  const generateCodeFront = useCallback(async (tableIds) => {
    setLoading(true);
    setError(null);
    try {
      const response= await generateCodeFrontForIds(tableIds);
    } catch (err) {
      setError(err.message || 'Failed to generate code.');
    } finally {
      setLoading(false);
    }
  }, []);


  const generateBaseCodeFront = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response= await generateBaseCodeFrontFor();
    } catch (err) {
      setError(err.message || 'Failed to generate code.');
    } finally {
      setLoading(false);
    }
  }, []);

  
  return {
    tableData,
    loading,
    error,
    pagination,
    fetchTables,
    removeTable,
    syncTableMetadata,
    generateCode,
    generateCodeFront,
    generateBaseCodeFront,
  };
};

export default useTable;
