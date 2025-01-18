// File: src/hooks/useProjectMaterials.js

import { useState, useCallback } from 'react';
import {
  getProjectMaterials,
  saveProjectMaterial,
  removeProjectMaterial,
} from '../api/ProjectMaterialService';

/**
 * Hook: useProjectMaterials
 * 管理 ProjectMaterial 数据的获取、保存和删除逻辑
 */
const useProjectMaterials = () => {
  const [data, setData] = useState([]); // 材料列表数据
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误状态

  // 获取指定项目的材料列表
  const fetchMaterials = useCallback(async (projectId) => {
    setLoading(true);
    try {
      const response = await getProjectMaterials(projectId);
      setData(response.data.materials || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 保存材料到项目
  const saveMaterial = useCallback(async (projectId, materialId) => {
    setLoading(true);
    try {
      const response = await saveProjectMaterial({ project_id: projectId, material_id: materialId });
      return response; // 返回保存结果
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 从项目中移除材料
  const removeMaterial = useCallback(async (projectId, materialId) => {
    setLoading(true);
    try {
      const response = await removeProjectMaterial(materialId, projectId);
      fetchMaterials(projectId); // 刷新材料列表
      return response; // 返回移除结果
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchMaterials]);

  return {
    data,
    loading,
    error,
    fetchMaterials,
    saveMaterial,
    removeMaterial,
  };
};

export default useProjectMaterials;
