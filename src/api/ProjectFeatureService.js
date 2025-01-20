import apiClient from './axiosInterceptor';

/**
 * 获取指定项目的技术特点
 * @param {number|string} projectId - 项目 ID
 * @returns {Promise} 项目技术特点列表
 */
export const getProjectFeatures = async (projectId) => {
  const response = await apiClient.get(`/project_feature/${projectId}/features`);
  return response.data;
};

/**
 * 保存项目的技术特点（新增或更新）
 * @param {number|string} projectId - 项目 ID
 * @param {Array} features - 选中的技术特点列表
 * @returns {Promise} 保存结果
 */
export const saveProjectFeatures = async (projectId, features) => {
  const response = await apiClient.post(`/project_feature/${projectId}/features`, { features });
  return response.data;
};
