
// src/hooks/useTable.js
import { useState,  useCallback } from 'react';
import { updateColumns,syncMetadata,getColumnsById } from '../api/talbe/ColumnService';

const useTable = () => {
  const [columnsData, setColumns] = useState([]); // 列数据
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误信息


  // 获取列数据
  const fetchColumns = useCallback(async (tableId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getColumnsById(tableId);
      console.log('test',data.data)

      setColumns(data.data || []);
      console.log('tested',columnsData)
    } catch (err) {
      setError(err.message || 'Failed to fetch columns.');
    } finally {
      setLoading(false);
    }
  }, []);



  // 同步元数据
  const syncColumnsMetadata = useCallback(async (tableId,tableName) => {
    setLoading(true);
    setError(null);
    try {
      await syncMetadata(tableName);
      fetchColumns(tableId); // 刷新数据
    } catch (err) {
      setError(err.message || 'Failed to sync metadata.');
    } finally {
      setLoading(false);
    }
  }, []);


    // 同步元数据
    const updateColumnsBy = useCallback(async (tableId,data) => {
      setLoading(true);
      setError(null);
      try {
        await updateColumns(data.id,data);
        fetchColumns(tableId); // 刷新数据
      } catch (err) {
        setError(err.message || 'Failed to sync metadata.');
      } finally {
        setLoading(false);
      }
    }, []);

  
  return {
    columnsData,
    loading,
    error,
    updateColumnsBy,
    fetchColumns,
    syncColumnsMetadata,
  };
};

export default useTable;
