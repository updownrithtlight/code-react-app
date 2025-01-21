import apiClient from './axiosInterceptor';
import { baseURL } from './api-config'; // Import baseURL from configuration file
/**
 * 上传文件
 * @param {File} file - 需要上传的文件
 * @returns {Promise} 上传结果
 */
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/file/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

/**
 * 预览文件
 * @param {string} filename - 文件名称
 * @returns {string} 文件 URL（用于在前端直接显示）
 */
export const previewFile = (filename) => {
  return `${apiClient.defaults.baseURL}/file/preview/${filename}`;
};

/**
 * 下载文件
 * @param {string} filename - 文件名称
 * @returns {Promise<Blob>} 文件 Blob 数据
 */
export const downloadFile = async (filename) => {
  const response = await apiClient.get(`/file/download/${filename}`, {
    responseType: 'blob', // 处理二进制数据
  });

  return response.data;
};

/**
 * 删除文件
 * @param {string} filename - 文件名称
 * @returns {Promise} 删除结果
 */
export const deleteFile = async (filename) => {
  const response = await apiClient.delete(`/file/delete/${filename}`);
  return response.data;
};




export const generateTechManualProjectById = async (projectId) => {
  const response = await apiClient.get(`/office_file/generate/tech-manual/${projectId}`);
  return response.data;
};

/**
 * 📌 预览技术说明书 PDF
 * @param {number} projectId - 项目 ID
 */
export const previewTechManual = async (projectId) => {
  console.log('dadfsfsdfdsfsdfsdfdsf',projectId)
  return `${baseURL}/office_file/preview/tech-manual/${projectId}`;
};
