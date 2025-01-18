// File: src/api/ProjectFieldService.js

import apiClient from '../axiosInterceptor';

/**
 * 获取所有 ProjectField 数据
 * @param {Object} params - 查询参数（分页、搜索等）
 * @returns {Promise} 数据列表
 */
export const getProjectFields = async (params = {}) => {
  const response = await apiClient.get('/project_field', { params });
  return response.data;
};

/**
 * 根据 ID 获取单条 ProjectField 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 单条数据
 */
export const getProjectFieldById = async (id) => {
  const response = await apiClient.get(`/project_field/${id}`);
  return response.data;
};

/**
 * 🔥 保存（新增或更新）ProjectField 数据（支持单条 & 批量）
 * @param {Object|Array} data - 单个对象或对象数组
 * @returns {Promise} API 响应
 */
export const saveProjectField = async (data) => {
  if (Array.isArray(data)) {
    // ✅ **批量提交**
    const response = await apiClient.post('/project_field/batch', { fields: data });
    return response.data;
  } else {
    // ✅ **单条提交**
    const response = await apiClient.post('/project_field', data);
    return response.data;
  }
};


/**
 * 删除 ProjectField 数据
 * @param {number|string} projectId - 关联的项目 ID
 * @param {number|string} fieldId - 关联的字段 ID
 * @returns {Promise} 删除结果
 */
export const deleteProjectField = async (projectId, fieldId) => {
  const response = await apiClient.delete(`/project_field/${projectId}/field/${fieldId}`);
  return response.data;
};


/**
 * 根据 project_id 获取 ProjectField 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 单条数据
 */
export const getProjectFieldByProjectId = async (project_id) => {
  const response = await apiClient.get(`/project_field/project/${project_id}`);
  return response.data;
};