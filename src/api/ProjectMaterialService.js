// File: src/api/ProjectMaterialService.js

import apiClient from './axiosInterceptor';

/**
 * 获取指定项目的材料列表
 * @param {number|string} projectId - 项目 ID
 * @returns {Promise} 材料列表
 */
export const getProjectMaterials = async (projectId) => {
  const response = await apiClient.get(`/project-material/${projectId}`);
  return response.data;
};

/**
 * 保存材料到项目
 * @param {Object} data - 数据对象（包含 projectId 和 materialId）
 * @returns {Promise} 保存结果
 */
export const saveProjectMaterial = async (data) => {
  const response = await apiClient.post('/project-material', data);
  return response.data;
};

/**
 * 从项目中移除材料
 * @param {number|string} materialId - 材料 ID
 * @param {number|string} projectId - 项目 ID（通过查询参数传递）
 * @returns {Promise} 移除结果
 */
export const removeProjectMaterial = async (materialId, projectId) => {
  const response = await apiClient.delete(`/project-material/${materialId}`, {
    params: { project_id: projectId },
  });
  return response.data;
};
