import apiClient from './axiosInterceptor';

/**
 * 获取所有标准检验项目 (t_inspection_items)
 * @returns {Promise} 检验项目列表
 */
export const getInspectionItems = async () => {
  const response = await apiClient.get('/inspections/items');
  return response.data;
};

/**
 * 根据 project_id 获取该项目绑定的检验项目信息 (t_project_inspections)
 * @param {number|string} projectId - 项目 ID
 * @returns {Promise} 该项目的检验项目信息
 */
export const getProjectInspections = async (projectId) => {
  const response = await apiClient.get(`/inspections/project/${projectId}/inspections`);
  return response.data;
};

/**
 * 🔥 保存 (新增或更新) project_id 绑定的检验数据 (支持单条 & 批量)
 * @param {number|string} projectId - 项目 ID
 * @param {Array|Object} data - 需要保存的检验数据 (单个对象 或 批量数组)
 * @returns {Promise} API 响应
 */
export const saveProjectInspections = async (projectId, data) => {
  if (Array.isArray(data)) {
    // ✅ **批量提交**
    const response = await apiClient.post(`/inspections/project/${projectId}/inspections`, { inspections: data });
    return response.data;
  } else {
    // ✅ **单条提交**
    const response = await apiClient.post(`/inspections/project/${projectId}/inspections`, data);
    return response.data;
  }
};

/**
 * 删除 project_id 绑定的某个检验项目
 * @param {number|string} projectId - 项目 ID
 * @param {string} itemKey - 检验项目 key
 * @returns {Promise} 删除结果
 */
export const deleteProjectInspection = async (projectId, itemKey) => {
  const response = await apiClient.delete(`/inspections/project/${projectId}/inspections/${itemKey}`);
  return response.data;
};

