// File: src/api/MaterialService.js

import apiClient from '../axiosInterceptor';

/**
 * 获取所有 Material 数据
 * @param {Object} params - 查询参数（分页、搜索等）
 * @returns {Promise} 数据列表
 */
export const getMaterials = async (params = {}) => {
  const response = await apiClient.get('/material_info/material_info', { params });
  return response.data;
};

/**
 * 根据 ID 获取单条 Material 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 单条数据
 */
export const getMaterialById = async (id) => {
  const response = await apiClient.get(`/material_info/material_info/${id}`);
  return response.data;
};

/**
 * 保存（新增或更新）Material 数据
 * @param {Object} data - 数据对象
 * @returns {Promise} 保存结果
 */
export const saveMaterial = async (data) => {
  if (data.id) {
    const response = await apiClient.put(`/material_info/material_info/${data.id}`, data);
    return response.data;
  } else {
    const response = await apiClient.post('/material_info/material_info', data);
    return response.data;
  }
};

/**
 * 删除 Material 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 删除结果
 */
export const deleteMaterial = async (id) => {
  const response = await apiClient.delete(`/material_info/material_info/${id}`);
  return response.data;
};


export const importExcel = async (formData) => {
  try {
    const response = await apiClient.post('/material_info/material_info/import', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error importing Excel file:', error);
    throw error;
  }
};