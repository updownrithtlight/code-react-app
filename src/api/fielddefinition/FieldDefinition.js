// File: src/api/FieldDefinitionService.js

import apiClient from '../axiosInterceptor';

/**
 * 获取所有 FieldDefinition 数据
 * @param {Object} params - 查询参数（分页、搜索等）
 * @returns {Promise} 数据列表
 */
export const getFieldDefinitions = async (params = {}) => {
  const response = await apiClient.get('/field_definition', { params });
  return response.data;
};

/**
 * 根据 ID 获取单条 FieldDefinition 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 单条数据
 */
export const getFieldDefinitionById = async (id) => {
  const response = await apiClient.get(`/field_definition/${id}`);
  return response.data;
};

/**
 * 保存（新增或更新）FieldDefinition 数据
 * @param {Object} data - 数据对象
 * @returns {Promise} 保存结果
 */
export const saveFieldDefinition = async (data) => {
  if (data.id) {
    const response = await apiClient.put(`/field_definition/${data.id}`, data);
    return response.data;
  } else {
    const response = await apiClient.post('/field_definition', data);
    return response.data;
  }
};

/**
 * 删除 FieldDefinition 数据
 * @param {number|string} id - 数据 ID
 * @returns {Promise} 删除结果
 */
export const deleteFieldDefinition = async (id) => {
  const response = await apiClient.delete(`/field_definition/${id}`);
  return response.data;
};
