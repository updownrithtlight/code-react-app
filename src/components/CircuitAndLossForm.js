import React, { useEffect, useState, useCallback } from 'react';
import { Form, TreeSelect, Card, Upload, InputNumber, Select,Button, Checkbox, Row, Col, message, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { getFieldDefinitionById } from '../api/fielddefinition/FieldDefinitionService';
import { getProjectField, saveProjectField, deleteProjectField } from '../api/projectfield/ProjectFieldService';
import { baseURL } from '../api/api-config'; // Import baseURL from configuration file

const { Option } = Select;

const CircuitAndLossForm = ({ projectId }) => {
  const [form] = Form.useForm();
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isHandDrawn, setIsHandDrawn] = useState(false);
  const [showWeightInput, setShowWeightInput] = useState(false);
  const [showInsertLoss, setShowInsertLoss] = useState(false);
  const [environmentalTests, setEnvironmentalTests] = useState([]);
  const [weightData, setWeightData] = useState({ value: null, unit: "kg" });
  const [showEnvironmentalTests, setShowEnvironmentalTests] = useState(false);

  const [circuitDiagramId, setCircuitDiagramId] = useState(59);
  const [insertLossId, setInsertLossId] = useState(59);
  const [weightId, setWeightId] = useState(59);
  const [environmentalId, setEnvironmentalId] = useState(59);

  const [loading, setLoading] = useState(false);

  const treeData = [
    { title: '无', value: -1 },
    { title: '手绘', value: -2 },
    {
      id: 70,
      title: '直流',
      children: [
        { id: 75, title: '10电路（直流一级滤波）', img: '/circuits/1.png', value: 'image1.emf' },
        { id: 76, title: '12电路（直流一级滤波）', img: '/circuits/2.png', value: 'image2.emf' },
        { id: 77, title: '14电路（直流一级滤波）', img: '/circuits/3.png', value: 'image3.emf' },
        { id: 78, title: '16电路（直流一级滤波）', img: '/circuits/4.png', value: 'image4.emf' },
        { id: 79, title: '18电路（直流一级滤波）', img: '/circuits/5.png', value: 'image5.emf' },
        { id: 80, title: '20电路（直流一共一差滤波）', img: '/circuits/6.png', value: 'image6.emf' },
        { id: 81, title: '22电路（直流两共滤波）', img: '/circuits/7.png', value: 'image7.emf' },
        { id: 82, title: '24电路（直流一共单差滤波）', img: '/circuits/9.png', value: 'image9.emf' },
        { id: 83, title: '32电路（直流两共一差滤波）', img: '/circuits/9.png', value: 'image9.emf' },
      ],
    },
    {
      id: 71,
      title: '交流单相',
      children: [
        { id: 84, title: '11电路（交流一级滤波）', img: '/circuits/10.png', value: 'image10.emf' },
        { id: 85, title: '13电路（交流一级滤波）', img: '/circuits/11.png', value: 'image11.emf' },
        { id: 86, title: '17电路（交流一级滤波）', img: '/circuits/12.png', value: 'image12.emf' },
        { id: 87, title: '21电路（交流一共一差滤波）', img: '/circuits/13.png', value: 'image13.emf' },
        { id: 88, title: '23电路（交流两共滤波）', img: '/circuits/14.png', value: 'image14.emf' },
        { id: 89, title: '33电路（交流两共一差滤波）', img: '/circuits/15.png', value: 'image15.emf' },
      ],
    },
    {
      id: 72,
      title: '交流三相三线',
      children: [
        { id: 90, title: '53电路（一级滤波）', img: '/circuits/16.png', value: 'image16.emf' },
        { id: 91, title: '63电路（一共一差滤波）', img: '/circuits/17.png', value: 'image17.emf' },
        { id: 92, title: '69电路（一共一差滤波）', img: '/circuits/18.png', value: 'image18.emf' },
      ],
    },
    {
      id: 73,
      title: '交流三相四线',
      children: [
        { id: 93, title: '55电路（一级滤波）', img: '/circuits/19.png', value: 'image19.emf' },
        { id: 94, title: '59电路（一级滤波）', img: '/circuits/20.png', value: 'image20.emf' },
        { id: 95, title: '65电路（一共一差滤波）', img: '/circuits/21.png', value: 'image21.emf' },
      ],
    },
    {
      id: 74,
      title: '脉冲群抑制',
      children: [
        { id: 96, title: '72电路（三差滤波）', img: '/circuits/22.png', value: 'image22.emf' },
      ],
    },
];

  const environmentalOptions = [
    {id:62, label: '盐雾', value: 'salt_spray' },
    {id:63, label: '霉菌', value: 'mold_resistance' },
    {id:64, label: '冲击', value: 'shock_resistance' },
    {id:65, label: '振动', value: 'vibration_resistance' },
  ];

  /** **获取数据并回显** */
  const fetchData = async () => {
    try {
      setLoading(true);
       const [circuitDiagram, insertionLoss,weight,environmental] = await Promise.all([
          getFieldDefinitionById("circuit_diagram"),
          getFieldDefinitionById("insertion_loss"),
          getFieldDefinitionById("weight"),
          getFieldDefinitionById("environmental_characteristics"),
        ]);
        setInsertLossId(insertionLoss.data.id);
        setCircuitDiagramId(circuitDiagram.data.id);
        setWeightId(weight.data.id);
        setEnvironmentalId(environmental.data.id);
        const [circuitDiagramResp,insertionLossResp,weightResp,environmentalResp] = await Promise.all([
        
          getProjectField(projectId,circuitDiagram.data.id),
          getProjectField(projectId,insertionLoss.data.id),
          getProjectField(projectId,weight.data.id),
          getProjectField(projectId,environmental.data.id),

        ]);
        console.log('打印了circuitDiagramResp 吗',circuitDiagramResp)
        console.log('打印了insertionLossResp吗',insertionLossResp.data.is_checked)
        console.log('打印了weightResp 吗',weightResp)
        console.log('打印了environmentalResp吗',environmentalResp)
        const data = circuitDiagramResp.data;

        let weightString = weightResp.data?.custom_value || "";  // 例如 "33kg"
        let weightValue = parseFloat(weightString);  // 提取数值 33
        let weightUnit = weightString.replace(/[0-9]/g, '').trim() || "kg"; // 提取单位 "kg"
    
        setWeightData({ value: weightValue || null, unit: weightUnit });
        
      form.setFieldsValue({
        circuitType: data.custom_value || null,
        weightValue: weightValue || null,
        weightUnit:  weightUnit  || "g",
        insertLoss:  insertionLossResp.data.is_checked || false,
        environmentalTests: environmentalResp.data.custom_value || [],
      });
      setSelectedCircuit(
        data.custom_value ? treeData.flatMap(p => p.children || []).find(item => item.value === data.custom_value) : null
      );
      setIsHandDrawn(data.custom_value === -2);
      if (data.image_path) setUploadedImage(data.image_path);
      setShowWeightInput(!!weightString);
      setShowInsertLoss(!!insertionLossResp.data.is_checked);
      setShowEnvironmentalTests(environmentalResp.data.is_checked)
      console.log('array??',environmentalResp.data.custom_value)
      setEnvironmentalTests(environmentalResp.data.custom_value || []);
      setLoading(false);
    } catch (error) {
      message.error("获取数据失败");
      setLoading(false);
    }
  };

  /** **防抖处理**保存数据 */
  const debouncedSaveData = useCallback(
    debounce(async (code, key,column,value,flag) => {
      try {
        setLoading(true);
      if(flag){
          await saveProjectField({
            project_id: projectId,
            field_id: key,
            [column]: value,
            code: code
          });

        }else{
          await deleteProjectField(projectId,key)
        }
      setLoading(false);
      } catch (error) {
        message.error("保存失败，请重试");
        setLoading(false);
      }
    }, 800),
    [projectId]
  );

  useEffect(() => {
    fetchData();
  }, [projectId]);

  const handleCircuitChange = (value) => {
    let flag =true;
    if (value === -1) {
      setSelectedCircuit(null);
      setUploadedImage(null);
      setIsHandDrawn(false);
      flag =false;
    } else if (value === -2) {
      setSelectedCircuit(null);
      setUploadedImage(null);
      setIsHandDrawn(true);
    } else {
      const selected = treeData.flatMap(p => p.children || []).find(c => c.value === value);
      setSelectedCircuit(selected);
      setUploadedImage(null);
      setIsHandDrawn(false);
    }
    form.setFieldsValue({ circuitType: value });
    debouncedSaveData("circuit_diagram",circuitDiagramId,"custom_value", value,flag);
  };


  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${baseURL}/file/upload`, formData);
      if (response.data.success) {
        const fileUrl = response.data.data.url;
        setUploadedImage(fileUrl);
        debouncedSaveData("circuit_diagram", circuitDiagramId, "image_path", fileUrl, true);
      } else {
        message.error("上传失败，请重试");
      }
    } catch (error) {
      message.error("上传错误");
    }
  };

    /** **拼接重量字符串并保存** */
    const handleWeightChange = (type, value) => {
      const updatedWeightData = { ...weightData, [type]: value };
      setWeightData(updatedWeightData);
      if (updatedWeightData.value !== null && updatedWeightData.unit) {
        const weightString = `${updatedWeightData.value}${updatedWeightData.unit}`;
        debouncedSaveData("weight",weightId,"custom_value", weightString,true);
      }
    };

    const handleEnvOptions = (values) => {
        debouncedSaveData("environmental_characteristics", 
        environmentalId,"custom_value", values,true);
    };

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: '1000px', margin: '0 auto', background: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="circuitType" label="选择滤波电路类型">
            <TreeSelect style={{ width: "100%" }} treeData={treeData} placeholder="请选择" treeDefaultExpandAll onChange={handleCircuitChange} />
          </Form.Item>
        </Col>
        {isHandDrawn && (
          <Col span={12}>
            <Form.Item label="上传手绘电路图">
              <Upload customRequest={handleUpload} listType="picture" showUploadList={false}>
                <Button>
                  <UploadOutlined /> 上传手绘电路图
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        )}
      </Row>

      {(selectedCircuit || uploadedImage) && (
        <Card title="电路图预览" style={{ marginBottom: 20, textAlign: "center" }}>
          <img alt="电路图" src={uploadedImage || selectedCircuit?.img} style={{ width: "100%", maxWidth: "400px", height: "auto", objectFit: "contain" }} />
        </Card>
      )}
   
    <Divider>插入损耗特性</Divider>

      <Form.Item>
        <Checkbox checked={showInsertLoss} onChange={(e) => {
          setShowInsertLoss(e.target.checked);
          debouncedSaveData("insertion_loss",insertLossId,"is_checked", e.target.checked, e.target.checked);
        }}>
          插入损耗特性
        </Checkbox>
      </Form.Item>

      <Divider>重量</Divider>
      <Form.Item>
        <Checkbox checked={showWeightInput} onChange={(e) => {
          setShowWeightInput(e.target.checked);
          if (!e.target.checked) {
            setWeightData({ value: null, unit: "kg" });
            debouncedSaveData("",weightId,"","", e.target.checked);
          }
        }}>
          重量
        </Checkbox>
      </Form.Item>

      {showWeightInput && (
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="weightValue" label="重量">
              <InputNumber
                min={1}
                max={1000}
                style={{ width: '100%' }}
                value={weightData.value}
                onChange={(value) => handleWeightChange("value", value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="weightUnit" label="单位">
              <Select
                style={{ width: '100%' }}
                value={weightData.unit}
                onChange={(value) => handleWeightChange("unit", value)}
              >
                <Option value="g">g</Option>
                <Option value="kg">kg</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      )}

      <Divider>环境特性</Divider>
      <Form.Item>
        <Checkbox checked={showEnvironmentalTests} onChange={(e) => {
          setShowEnvironmentalTests(e.target.checked);
          setEnvironmentalTests([]);
          debouncedSaveData("environmental_characteristics", 
            environmentalId,"is_checked", e.target.checked,e.target.checked);
        
        }}>
          环境特性
        </Checkbox>
      </Form.Item>

      {showEnvironmentalTests && (
        <Form.Item name="environmentalTests" label="">
          <Checkbox.Group
            options={environmentalOptions}
            value={environmentalTests}
            onChange={(values) => {
              setEnvironmentalTests(values);
              handleEnvOptions(values);
            }}
          />
        </Form.Item>
      )}
    </Form>
  );
};

export default CircuitAndLossForm;
