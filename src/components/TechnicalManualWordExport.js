import React from "react";
import { Button } from "antd";
import { FileWordOutlined } from "@ant-design/icons";
import useGenerateWord from "../hooks/useGenerateWord";

const WordExport = ({ projectId }) => {
  const { downloadWord, loading } = useGenerateWord();

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Button
        type="primary"
        icon={<FileWordOutlined />}
        loading={loading}
        onClick={() => downloadWord(projectId)}
        disabled={!projectId}
        style={{
          backgroundColor: "#1890ff",
          borderColor: "#1890ff",
          color: "white",
          padding: "10px 20px",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        生成技术说明书并下载 Word 文档
      </Button>
    </div>
  );
};

export default WordExport;
