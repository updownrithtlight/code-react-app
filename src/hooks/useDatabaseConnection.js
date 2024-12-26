// File: src/hooks/useDatabaseConnection.js

import { useState,useCallback } from 'react';
import { getDatabaseConnections, getDatabaseConnectionById, saveDatabaseConnection, deleteDatabaseConnection } from '../api/DatabaseConnectionService';

/**
 * Hook: useDatabaseConnections
 * 管理 DatabaseConnection 数据的获取、保存和删除逻辑
 */
const useDatabaseConnections = () => {
  const [data, setData] = useState([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 }); // 分页状态

  // 获取列表数据
  const fetchData = useCallback(async ({ page, pageSize, ...queryParams } = {}) => {
    setLoading(true);
    try {
      const response = await getDatabaseConnections({
        page: page || pagination.current-1,
        pageSize: pageSize || pagination.pageSize,
        ...queryParams,
      });
      console.log('页面查询开始',response)
      setData(response.data.content);
      setPagination({ ...pagination, total: response.totalElements });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  // 获取单条数据
  const fetchById =useCallback( async (id) => {
    try {
      const response = await getDatabaseConnectionById(id);
      return response;
    } catch (err) {
      setError(err);
    }
  }, []);

  // 保存（新增或编辑）数据
  const save = useCallback(async (data) => {
    try {
      await saveDatabaseConnection(data);
      fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
    } catch (err) {
      setError(err);
    }
  }, [fetchData, pagination.current-1, pagination.pageSize]);

  // 删除数据
  const remove = useCallback(async (id) => {
    try {
      await deleteDatabaseConnection(id);
      fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
    } catch (err) {
      setError(err);
    }
  }, [fetchData, pagination.current-1, pagination.pageSize]);

  return {
    data,
    loading,
    error,
    pagination,
    fetchData,
    fetchById,
    save,
    remove,
  };
};

export default useDatabaseConnections;
