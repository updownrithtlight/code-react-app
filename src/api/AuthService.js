import apiClient from './axiosInterceptor';

/**
 * 登录
 * @param {Object} credentials - 用户名和密码
 * @returns {Promise} 用户信息和 Token
 */
export const loginApi = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

/**
 * 登出
 * @returns {Promise} 登出结果
 */
export const logoutApi = async () => {
  const response = await apiClient.post('/auth/logout');
  return response.data;
};


/**
 * 获取当前用户信息
 * @returns {Promise} 用户信息
 */
export const getUserInfoApi = async () => {
  const response = await apiClient.get('/auth/me');
  return response.data;
};
