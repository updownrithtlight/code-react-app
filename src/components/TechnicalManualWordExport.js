import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FileWordOutlined, EyeOutlined } from "@ant-design/icons";
import useGenerateWord from "../hooks/useGenerateWord";
import { generateTechManualProjectById} from "../api/FileService";
import { baseURL } from '../api/api-config'; // Import baseURL from configuration file

const TechnicalManualWordExport = ({ projectId }) => {
  const { downloadTechManual, loading } = useGenerateWord();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 📌 预览技术说明书 PDF
  const handlePreview = async () => {
    if (!projectId) return;
     const response = await generateTechManualProjectById(projectId);
     console.log('关于了--------',response)
    const url = `${baseURL}/office_file/preview/${response}`;
    setPreviewUrl(url);
    setPreviewVisible(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      {/* 生成并下载 Word */}
      <Button
        type="primary"
        icon={<FileWordOutlined />}
        loading={loading}
        onClick={() => downloadTechManual(projectId)}
        disabled={!projectId}
        style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", color: "white" }}
      >
        生成技术说明书
      </Button>

      {/* 预览 PDF 按钮 */}
      <Button
        type="default"
        icon={<EyeOutlined />}
        onClick={handlePreview}
        disabled={!projectId}
        style={{ marginLeft: 10 }}
      >
        预览
      </Button>

      {/* PDF 预览弹窗 */}
      <Modal
        title="技术说明书预览"
        visible={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={1400}
      >
        {previewUrl ? (
          <iframe src={previewUrl} style={{ width: "100%", height: "500px", border: "none" }} />
        ) : (
          "加载中..."
        )}
      </Modal>
    </div>
  );
};

export default TechnicalManualWordExport;
