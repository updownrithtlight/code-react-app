import apiClient from './axiosInterceptor';

/**
 * 获取所有技术特点
 * @returns {Promise} 技术特点列表
 */
export const getAllTechnicalFeatures = async () => {
  const response = await apiClient.get('/technical_feature');
  return response.data;
};
