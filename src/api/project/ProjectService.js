// File: src/api/ProjectService.js

import apiClient from '../axiosInterceptor';

/**
 * 获取所有 Project 数据
 * @param {Object} params - 查询参数（分页、搜索等）
 * @returns {Promise} 数据列表
 */
export const getProjects = async (params = {}) => {
  const response = await apiClient.get('/project/project', { params });
  return response.data;
};

/**
 * 根据 ID 获取单条 Project 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 单条数据
 */
export const getProjectById = async (id) => {
  const response = await apiClient.get(`/project/project/${id}`);
  return response.data;
};

/**
 * 保存（新增或更新）Project 数据
 * @param {Object} data - 数据对象
 * @returns {Promise} 保存结果
 */
export const saveProject = async (data) => {
  if (data.id) {
    const response = await apiClient.put(`/project/project/${data.id}`, data);
    return response.data;
  } else {
    const response = await apiClient.post('/project/project', data);
    return response.data;
  }
};

/**
 * 删除 Project 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 删除结果
 */
export const deleteProject = async (id) => {
  const response = await apiClient.delete(`/project/project/${id}`);
  return response.data;
};
