import { useState } from "react";
import { message } from "antd";
import { downloadFileByProjectId } from "../api/WordGenerateService";

const useGenerateWord = () => {
  const [loading, setLoading] = useState(false);

  const downloadWord = async (projectId) => {
    if (!projectId) {
      message.error("未找到项目 ID");
      return;
    }

    try {
      setLoading(true);
      await downloadFileByProjectId(projectId);
      message.success("Word 文档下载成功！");
    } catch (error) {
      message.error("下载失败，请重试！");
    } finally {
      setLoading(false);
    }
  };

  return { downloadWord, loading };
};

export default useGenerateWord;
