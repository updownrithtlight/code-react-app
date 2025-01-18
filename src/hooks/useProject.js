// File: src/hooks/useProject.js

import { useState,useCallback } from 'react';
import { getProjects, getProjectById, saveProject, deleteProject } from '../api/project/ProjectService';
/**
 * Hook: useProjects
 * 管理 Project 数据的获取、保存和删除逻辑
 */
const useProjects = () => {
  const [data, setData] = useState([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 }); // 分页状态

  // 获取列表数据
  const fetchData = useCallback(async (page, pageSize, queryParams = {}) => {
    setLoading(true);
    try {
      const response = await getProjects({
        page: page || pagination.current-1,
        pageSize: pageSize || pagination.pageSize,
        project_name:queryParams.project_name,
        project_model:queryParams.project_model,
        project_type:queryParams.project_type,
        workingTemperature:queryParams.workingTemperature,
        storageTemperature:queryParams.storageTemperature,
      });
      setData(response.data.projects);
          // ✅ 更新分页状态，确保 React 状态更新正确
             setPagination((prev) => ({
              ...prev,
              current: page,
              pageSize,
              total: response.data.totalElements,
            }));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);
  // 获取单条数据
  const fetchById =useCallback( async (id) => {
    try {
      const response = await getProjectById(id);
      return response;
    } catch (err) {
      setError(err);
    }
  }, []);

  // 保存（新增或编辑）数据
  const save = useCallback(async (data) => {
    try {
      const response =  await saveProject(data);
      // fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
      return response;
    } catch (err) {
      setError(err);
    }
  }, [fetchData, pagination.current-1, pagination.pageSize]);

  // 删除数据
  const remove = useCallback(async (id) => {
    try {
      await deleteProject(id);
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

export default useProjects;
