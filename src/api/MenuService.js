import apiClient from './axiosInterceptor';

/**
 * 获取动态菜单数据
 * @returns {Promise} 菜单数据
 */
export const getMenuApi = async () => {
  const response = await apiClient.get('/menus'); // 后端接口返回菜单数据
  return response.data;
};
