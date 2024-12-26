import apiClient from '../axiosInterceptor';
 
  
  export const syncMetadata = async (tableName) => {
    try {
      const response = await apiClient.post(`/columns/sync/${tableName}`);
      return response.data;
    } catch (error) {
      throw new Error('同步表');
    }
  };


  export const updateColumns = (id, columns) => {
    return apiClient.put(`/columns/${id}`, columns);
  };
  
  
  export const getColumnsById = async (id) => {
    try {
      const response = await apiClient.get(`/tables/${id}/columns`);
      return response.data;
    } catch (error) {
      throw new Error('获取用户信息失败');
    }
  };