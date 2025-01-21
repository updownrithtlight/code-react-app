import { useState } from "react";
import { message } from "antd";
import { downloadTechManualByProjectId ,downloadProductSpecificationByProjectId} from "../api/WordGenerateService";

const useGenerateWord = () => {
  const [loading, setLoading] = useState(false);

  const downloadTechManual = async (projectId) => {
    if (!projectId) {
      message.error("未找到项目 ID");
      return;
    }

    try {
      setLoading(true);
      await downloadTechManualByProjectId(projectId);
      message.success("Word 文档下载成功！");
    } catch (error) {
      message.error("下载失败，请重试！");
    } finally {
      setLoading(false);
    }
  };


  
  const downloadProductSpecification = async (projectId) => {
    if (!projectId) {
      message.error("未找到项目 ID");
      return;
    }

    try {
      setLoading(true);
      await downloadProductSpecificationByProjectId(projectId);
      message.success("Word 文档下载成功！");
    } catch (error) {
      message.error("下载失败，请重试！");
    } finally {
      setLoading(false);
    }
  };

  return { downloadTechManual,downloadProductSpecification, loading };
};




export default useGenerateWord;
