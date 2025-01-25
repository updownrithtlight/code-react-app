import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Upload, Checkbox, Row, Col, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { baseURL } from '../api/api-config'; // Import baseURL from configuration file

const { Option } = Select;

const StructureDimensions = ({ 
  formStructureData, 
  setFormStructureData, 
  projectId, 
  parentId, 
  onRemove 
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const uploadUrl = `${baseURL}/file/upload`;

  // 预定义字段信息
  const FIELD_DEFINITIONS = {
    dimensions: { id: "51", name: "外形尺寸", code: "dimensions" },
    housing_material: { id: "52", name: "壳体材质", code: "housing_material" },
    surface_treatment: { id: "53", name: "生产工艺", code: "surface_treatment" },
    manufacturing_process: { id: "54", name: "表面处理", code: "manufacturing_process" },
    input_terminal: { id: "55", name: "输入端引出方式", code: "input_terminal" },
    output_terminal: { id: "56", name: "输出端引出方式", code: "output_terminal" }
  };

  useEffect(() => {
    if (formStructureData) {
      // ✅ 只取 `custom_value` 作为 Form 的 `setFieldsValue` 赋值
      const formValues = Object.keys(formStructureData).reduce((acc, key) => {
        acc[key] = formStructureData[key].custom_value;
        return acc;
      }, {});
      form.setFieldsValue(formValues);

      // ✅ 处理 `dimensions` 图片
      if (formStructureData.dimensions?.custom_value) {
        setFileList([
          {
            uid: '-1',
            url: formStructureData.dimensions.custom_value,
            name: '已上传图片',
            status: 'done'
          }
        ]);
      }
    }
  }, [formStructureData]);

  // ✅ 处理表单字段变化
  const handleFieldChange = (fieldKey, value) => {
    setFormStructureData(prevData => ({
      ...prevData,
      [fieldKey]: {
        field_id: FIELD_DEFINITIONS[fieldKey].id,
        code: FIELD_DEFINITIONS[fieldKey].code,
        custom_value: value,
        parent_id: parentId,
        project_id: projectId
      }
    }));
  };

  // ✅ 处理图片删除
  const handleRemove = (file) => {
    const filename = file.url.split('/').pop();
    console.log('dimensions---------',filename)

    onRemove(filename);
    handleFieldChange("dimensions", null);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onValuesChange={(changedValues, allValues) => {
        Object.keys(changedValues).forEach((key) => {
          handleFieldChange(key, changedValues[key]);
        });
      }}
      style={{ maxWidth: '1000px', margin: '0 auto', padding: '20px', background: '#fff', borderRadius: '8px' }}
    >
      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="外形尺寸">
            <Upload
              action={uploadUrl}
              listType="picture-card"
              fileList={fileList}
              onChange={({ file, fileList }) => {
                if (file.status === "done") {
                  const response = file.response;
                  if (response && response.success) {
                    handleFieldChange("dimensions", response.data.url);
                  } else {
                    message.error(response.message || "上传失败");
                  }
                }
                setFileList([...fileList]);
              }}
              onPreview={file => {
                setPreviewImage(file.url);
                setPreviewVisible(true);
              }}
              onRemove={handleRemove}
              accept="image/*"
            >
              {fileList.length >= 1 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>上传图片</div>
                </div>
              )}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={() => setPreviewVisible(false)}>
              <img alt="预览" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="壳体材质" name="housing_material">
            <Select placeholder="选择壳体材质" style={{ width: '100%' }}>
              <Option value="冷轧钢板">冷轧钢板</Option>
              <Option value="不锈钢 304">不锈钢 304</Option>
              <Option value="不锈钢 316L">不锈钢 316L</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="生产工艺" name="surface_treatment">
            <Select placeholder="选择生产工艺" style={{ width: '100%' }}>
              <Option value="钣金">钣金</Option>
              <Option value="铝铸">铝铸</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item label="表面处理" name="manufacturing_process">
            <Checkbox.Group options={["电镀镍（亮处理）", "喷砂", "导电氧化本色", "导电氧化黄色", "拉丝", "化学镀镍"]} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="输入端引出方式" name="input_terminal">
            <Input placeholder="请输入输入端引出方式" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="输出端引出方式" name="output_terminal">
            <Input placeholder="请输入输出端引出方式" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default StructureDimensions;
