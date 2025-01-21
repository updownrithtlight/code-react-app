import apiClient from '../axiosInterceptor';

/**
 * 获取所有用户列表
 * @param {Object} params - 查询参数（分页、搜索等）
 * @returns {Promise} 用户列表
 */
export const getUsers = async (params = {}) => {
  const response = await apiClient.get('/users', { params });
  return response.data;
};

/**
 * 根据 ID 获取单个用户信息
 * @param {number|string} userId - 用户 ID
 * @returns {Promise} 用户数据
 */
export const getUserById = async (userId) => {
  const response = await apiClient.get(`/users/${userId}`);
  return response.data;
};

/**
 * 🔥 保存（新增或更新）用户数据
 * @param {Object} data - 用户对象
 * @returns {Promise} API 响应
 */
export const saveUser = async (data) => {
  if (data.id) {
    // ✅ **更新用户**
    const response = await apiClient.put(`/users/${data.id}`, data);
    return response.data;
  } else {
    // ✅ **创建新用户**
    const response = await apiClient.post('/users', data);
    return response.data;
  }
};

/**
 * 删除用户
 * @param {number|string} userId - 用户 ID
 * @returns {Promise} 删除结果
 */
export const deleteUser = async (userId) => {
  const response = await apiClient.delete(`/users/${userId}`);
  return response.data;
};

/**
 * 重置用户密码（默认密码：用户名+123）
 * @param {number|string} userId - 用户 ID
 * @returns {Promise} 重置结果
 */
export const resetUserPassword = async (userId) => {
  const response = await apiClient.put(`/users/${userId}/reset-password`);
  return response.data;
};

/**
 * 禁用用户
 * @param {number|string} userId - 用户 ID
 * @returns {Promise} 禁用结果
 */
export const disableUser = async (userId) => {
  const response = await apiClient.put(`/users/${userId}/disable`);
  return response.data;
};

/**
 * 启用用户
 * @param {number|string} userId - 用户 ID
 * @returns {Promise} 启用结果
 */
export const enableUser = async (userId) => {
  const response = await apiClient.put(`/users/${userId}/enable`);
  return response.data;
};



export const updateUserRoles = async (userId,data) => {
      // ✅ **更新用户角色**
      const response = await apiClient.put(`/users/${userId}/roles`, data);
      return response.data;
 
  };