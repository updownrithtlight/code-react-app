import React, { useEffect, useState, useCallback } from 'react';
import { Form, Upload, Button, Card, message, Row, Col } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import debounce from "lodash/debounce";
import { getProjectField, saveProjectField, deleteProjectField } from '../api/projectfield/ProjectFieldService';

const MarkingForm = ({ projectId, fieldId }) => {
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  /** **获取已上传图片** */
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await getProjectField(projectId,fieldId);
      console.log("获取  999",response.data)
      if (response?.success && response.data?.image_path) {
        setUploadedImage(response.data.image_path);
      }
    } catch (error) {
      message.error("获取图片失败");
    } finally {
      setLoading(false);
    }
  };

  /** **防抖保存数据** */
  const debouncedSaveData = useCallback(
    debounce(async (value) => {
      try {
        setLoading(true);
        await saveProjectField({
          project_id: projectId,
          field_id: fieldId,
          image_path: value,
          code: 'marking_image'
        });
        message.success("图片已保存");
      } catch (error) {
        message.error("保存失败，请重试");
      } finally {
        setLoading(false);
      }
    }, 800),
    [projectId, fieldId]
  );

  useEffect(() => {
    fetchData();
  }, [projectId, fieldId]);

  /** **处理上传图片** */
  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/file/upload", formData);
     if (response.data.success) {
        const fileUrl = response.data.data.url;
        setUploadedImage(fileUrl);
        debouncedSaveData(fileUrl);
      } else {
        message.error("上传失败，请重试");
      }
    } catch (error) {
      message.error("上传错误");
    }
  };

  /** **删除图片** */
  const handleRemove = async () => {
    try {
      setUploadedImage(null);
      await deleteProjectField(projectId,fieldId);
      message.success("图片已删除");
    } catch (error) {
      message.error("删除失败，请重试");
    }
  };

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
      
      {/* 上传按钮居中 */}
      <Row justify="center">
        <Col>
          <Upload customRequest={handleUpload} showUploadList={false}>
            <Button type="primary" icon={<UploadOutlined />} loading={loading}>
              上传标志图片
            </Button>
          </Upload>
        </Col>
      </Row>

      {/* 图片预览 */}
      {uploadedImage && (
        <Card
          title="图片预览"
          bordered={false}
          style={{ marginTop: 20, textAlign: "center", boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
          bodyStyle={{ padding: '10px', position: 'relative' }}
        >
          <img 
            alt="标志图片" 
            src={uploadedImage} 
            style={{ width: "100%", maxWidth: "400px", height: "auto", borderRadius: '5px' }}
          />
          <Button 
            type="primary" 
            danger 
            icon={<DeleteOutlined />} 
            size="small" 
            onClick={handleRemove} 
            style={{ position: 'absolute', top: 10, right: 10, borderRadius: '5px' }}
          >
            
          </Button>
        </Card>
      )}
      
    </Form>
  );
};

export default MarkingForm;
