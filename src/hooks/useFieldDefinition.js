import { useState,  useCallback } from "react";
import {
  getFieldDefinitions,
  getFieldDefinitionById,
  saveFieldDefinition,
  deleteFieldDefinition,
} from "../api/fielddefinition/FieldDefinitionService";

/**
 * 自定义 Hook 用于管理 FieldDefinition 数据
 * @param {Object} initialParams - 初始化查询参数（分页、搜索）
 */
const useFieldDefinition = (initialParams = {}) => {
  const [data, setData] = useState([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误信息
  const [params, setParams] = useState(initialParams); // 查询参数

  /** 获取所有 FieldDefinition 数据 */
  const fetchFieldDefinitions = useCallback(async (queryParams = params) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getFieldDefinitions(queryParams);
      setData(data);
    } catch (err) {
      console.error("获取字段定义列表失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [params]);

  /** 根据 ID 获取单个 FieldDefinition 数据 */
  const fetchFieldDefinitionById = useCallback(async (id) => {

    setLoading(true);
    setError(null);
    try {
      const response = await getFieldDefinitionById(id);
      return response;
    } catch (err) {
      console.error("获取字段定义失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /** 保存（新增/更新）FieldDefinition */
  const saveFieldDefinitionData = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const result = await saveFieldDefinition(data);
      fetchFieldDefinitions(); // 更新列表
      return result;
    } catch (err) {
      console.error("保存字段定义失败:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchFieldDefinitions]);

  /** 删除 FieldDefinition */
  const deleteFieldDefinitionById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await deleteFieldDefinition(id);
      fetchFieldDefinitions(); // 更新列表
    } catch (err) {
      console.error("删除字段定义失败:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFieldDefinitions]);

  return {
    data,
    loading,
    error,
    params,
    setParams,
    fetchFieldDefinitions,
    fetchFieldDefinitionById,
    saveFieldDefinitionData,
    deleteFieldDefinitionById,
  };
};

export default useFieldDefinition;
