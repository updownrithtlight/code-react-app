import { useState, useCallback } from "react";
import {
  getProjectFields,
  getProjectFieldById,
  getProjectFieldByProjectId,
  getProjectFieldByProjectIdParentId,
  saveProjectField,
  deleteProjectField,
} from "../api/projectfield/ProjectFieldService";

/**
 * 自定义 Hook 用于管理 ProjectField 数据
 * @param {Object} initialParams - 初始化查询参数（分页、搜索）
 */
const useProjectField = (initialParams = {}) => {
  const [data, setData] = useState([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误信息
  const [params, setParams] = useState(initialParams); // 查询参数

  /** 获取所有 ProjectField 数据 */
  const fetchProjectFields = useCallback(async (queryParams = params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProjectFields(queryParams);
      setData(data);
    } catch (err) {
      console.error("获取项目字段列表失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  /** 根据 ID 获取单个 ProjectField 数据 */
  const fetchProjectFieldById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProjectFieldById(id);
      return response;
    } catch (err) {
      console.error("获取项目字段失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 根据 `project_id` 获取 ProjectField 数据 */
  const fetchProjectFieldsByProjectId = useCallback(async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProjectFieldByProjectId(projectId);
      return response;
    } catch (err) {
      console.error("获取项目字段失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 根据 `project_id` 和 `parent_id` 获取 ProjectField 数据 */
  const fetchProjectFieldsByProjectIdParentId = useCallback(async (projectId, parentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getProjectFieldByProjectIdParentId(projectId, parentId);
      return response;
      } catch (err) {
      console.error("获取项目字段失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 保存（新增/更新）ProjectField（支持单条 & 批量） */
  const saveProjectFieldData = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saveProjectField(data);
      return result;
    } catch (err) {
      console.error("保存项目字段失败:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  /** 删除 ProjectField */
  const deleteProjectFieldById = useCallback(async (projectId, fieldId) => {
    setLoading(true);
    setError(null);
    try {
      await deleteProjectField(projectId, fieldId);
    } catch (err) {
      console.error("删除项目字段失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    data,
    loading,
    error,
    params,
    setParams,
    fetchProjectFields,
    fetchProjectFieldById,
    fetchProjectFieldsByProjectId,
    fetchProjectFieldsByProjectIdParentId,
    saveProjectFieldData,
    deleteProjectFieldById,
  };
};

export default useProjectField;
