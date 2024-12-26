// File: src/api/DatabaseConnectionService.js

import apiClient from './axiosInterceptor';

/**
 * 获取所有 DatabaseConnection 数据
 * @param {Object} params - 查询参数（分页、搜索等）
 * @returns {Promise} 数据列表
 */
export const getDatabaseConnections = async (params = {}) => {
  const response = await apiClient.get('/database_connection', { params });
  return response.data;
};

/**
 * 根据 ID 获取单条 DatabaseConnection 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 单条数据
 */
export const getDatabaseConnectionById = async (id) => {
  const response = await apiClient.get(`/database_connection/${id}`);
  return response.data;
};

/**
 * 保存（新增或更新）DatabaseConnection 数据
 * @param {Object} data - 数据对象
 * @returns {Promise} 保存结果
 */
export const saveDatabaseConnection = async (data) => {
  if (data.id) {
    const response = await apiClient.put(`/database_connection/${data.id}`, data);
    return response.data;
  } else {
    const response = await apiClient.post('/database_connection', data);
    return response.data;
  }
};

/**
 * 删除 DatabaseConnection 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 删除结果
 */
export const deleteDatabaseConnection = async (id) => {
  const response = await apiClient.delete(`/database_connection/${id}`);
  return response.data;
};
