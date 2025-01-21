// File: src/api/RoleService.js

import apiClient from '../axiosInterceptor';

/**
 * 获取所有角色列表
 * @returns {Promise} 角色列表
 */
export const getRoles = async () => {
  const response = await apiClient.get('/roles');
  return response.data;
};

/**
 * 根据 ID 获取单个角色信息
 * @param {number|string} roleId - 角色 ID
 * @returns {Promise} 角色数据
 */
export const getRoleById = async (roleId) => {
  const response = await apiClient.get(`/roles/${roleId}`);
  return response.data;
};

/**
 * 🔥 保存（新增或更新）角色数据
 * @param {Object} data - 角色对象
 * @returns {Promise} API 响应
 */
export const saveRole = async (data) => {
  if (data.id) {
    // ✅ **更新角色**
    const response = await apiClient.put(`/roles/${data.id}`, data);
    return response.data;
  } else {
    // ✅ **创建新角色**
    const response = await apiClient.post('/roles', data);
    return response.data;
  }
};

/**
 * 删除角色
 * @param {number|string} roleId - 角色 ID
 * @returns {Promise} 删除结果
 */
export const deleteRole = async (roleId) => {
  const response = await apiClient.delete(`/roles/${roleId}`);
  return response.data;
};

/**
 * 🔥 角色分配菜单
 * @param {Object} data - 角色 & 菜单数据 { role_id, menu_ids }
 * @returns {Promise} API 响应
 */
export const assignMenuToRole = async (data) => {
  const response = await apiClient.post('/roles/assign-menu', data);
  return response.data;
};
