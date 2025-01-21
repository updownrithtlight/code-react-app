import React, { useState } from "react";
import { Button, Modal } from "antd";
import { FileWordOutlined, EyeOutlined } from "@ant-design/icons";
import useGenerateWord from "../hooks/useGenerateWord";
import { generateproductSpecProjectById} from "../api/FileService";
import { baseURL } from '../api/api-config'; // Import baseURL from configuration file

const ProductSpecificationWordExport = ({ projectId }) => {
  const {downloadProductSpecification , loading } = useGenerateWord();
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 📌 预览生成产品规范 PDF
  const handlePreview = async () => {
    if (!projectId) return;
     const response = await generateproductSpecProjectById(projectId);
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
        onClick={() => downloadProductSpecification(projectId)}
        disabled={!projectId}
        style={{ backgroundColor: "#1890ff", borderColor: "#1890ff", color: "white" }}
      >
        生成产品-规范
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
        title="生成产品规范预览"
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

export default ProductSpecificationWordExport;
