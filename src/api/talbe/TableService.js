import apiClient from '../axiosInterceptor';
 
  // User CRUD functions
  export const getTables = async (page, size, queryParams) => {
    try {
      // 构造请求参数对象，将 page 和 size 以及其他查询参数合并
      const params = {
              page,
              size,
              ...queryParams, // 将 queryParams 对象的键值对展开作为请求参数
            };
      const response = await apiClient.get('/tables', {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error('获取用户列表失败');
    }
  };


  

  
  export const syncMetadata = async () => {
    try {
      const response = await apiClient.post(`/metadata/sync`);
      return response.data;
    } catch (error) {
      throw new Error('同步表');
    }
  };
  
  export const deleteTable = async (id) => {
    try {
      await apiClient.delete(`/tables/${id}`);
    } catch (error) {
      throw new Error('删除用户失败');
    }
  };


  export const generateCodeForIds = async (tableIds) => {
    try {
      // 发起 POST 请求，将数组作为请求体传递
      const response = await apiClient.post(
        `/codegen/download/back`, // 后端接口地址
         tableIds , // 请求体，包含数组
        { responseType: 'blob' } // 接收文件流
      );
  
      // 创建文件下载链接
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
  
      // 从响应头解析文件名
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'downloaded_file';
  
      if (contentDisposition && contentDisposition.includes('filename=')) {
        const fileNameMatch = contentDisposition.match(/filename\*?=['"]?([^;\r\n"']+)/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, '').split('\'').pop());
        }
      }
  
      // 设置文件名并触发下载
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      return response; // 返回响应数据，供后续使用
    } catch (error) {
      console.error(`File download failed: ${error.message}`);
      throw new Error('File download failed.');
    }
  };
  

  export const generateCodeFrontForIds = async (tableIds) => {
    try {
      // 发起 POST 请求，将数组作为请求体传递
      const response = await apiClient.post(
        `/codegen/download/front`, // 后端接口地址
         tableIds , // 请求体，包含数组
        { responseType: 'blob' } // 接收文件流
      );
  
      // 创建文件下载链接
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
  
      // 从响应头解析文件名
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'downloaded_file';
  
      if (contentDisposition && contentDisposition.includes('filename=')) {
        const fileNameMatch = contentDisposition.match(/filename\*?=['"]?([^;\r\n"']+)/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, '').split('\'').pop());
        }
      }
  
      // 设置文件名并触发下载
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      return response; // 返回响应数据，供后续使用
    } catch (error) {
      console.error(`File download failed: ${error.message}`);
      throw new Error('File download failed.');
    }
  };
  

   
  export const generateBaseCodeFrontFor = async () => {
    try {
      // 发起 POST 请求，无参数
      const response = await apiClient.post(`/codegen/download/base-front`,null, {
        responseType: 'blob', // 接收文件流
      });
  
      // 创建文件下载链接
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
  
      // 从响应头解析文件名
      const contentDisposition = response.headers['content-disposition'];
      let fileName = 'downloaded_file';
  
      if (contentDisposition && contentDisposition.includes('filename=')) {
        const fileNameMatch = contentDisposition.match(/filename\*?=['"]?([^;\r\n"']+)/);
        if (fileNameMatch && fileNameMatch[1]) {
          fileName = decodeURIComponent(fileNameMatch[1].replace(/['"]/g, '').split('\'').pop());
        }
      }
  
      // 设置文件名并触发下载
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      return response; // 返回响应数据，供后续使用
    } catch (error) {
      console.error(`File download failed: ${error.message}`);
      throw new Error('File download failed.');
    }
  };
  