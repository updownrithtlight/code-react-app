import apiClient from './axiosInterceptor';

export const downloadTechManualByProjectId = async (projectId) => {
  try {
    // 发起 GET 请求
    const response = await apiClient.get(
      `/word/tech_manual/${projectId}`,
      { responseType: 'blob' } // 接收文件流
    );

    console.log('Response Headers:', response.headers);

    // 创建文件下载链接
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;

    // 从响应头解析文件名
    const contentDisposition = response.headers['content-disposition'];
    console.log('你打印了吗',contentDisposition)
    let fileName = 'downloaded_file.docx';

    if (contentDisposition) {
      // 优先匹配 filename* 格式
      const fileNameMatch = contentDisposition.match(/filename\*=['"]?UTF-8''([^;\r\n"']+)/);

      if (fileNameMatch && fileNameMatch[1]) {
        fileName = decodeURIComponent(fileNameMatch[1]);
      } else {
        // 回退到 filename= 格式
        const fallbackFileNameMatch = contentDisposition.match(/filename=['"]?([^;\r\n"']+)/);
        if (fallbackFileNameMatch && fallbackFileNameMatch[1]) {
          fileName = fallbackFileNameMatch[1];
        }
      }
    }

    // 设置文件名并触发下载
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(`File download failed: ${error.message}`);
    throw new Error('File download failed.');
  }
};
