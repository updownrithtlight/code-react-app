import React, { useEffect, useState, useCallback } from 'react';
import { Form, TreeSelect, Card, Upload, InputNumber, Select,Button, Checkbox, Row, Col, message, Divider } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import debounce from 'lodash/debounce';
import { getFieldDefinitionById } from '../api/fielddefinition/FieldDefinitionService';
import { getProjectField, saveProjectField, deleteProjectField } from '../api/projectfield/ProjectFieldService';

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

  const [loading, setLoading] = useState(false);

  const treeData = [
    { title: '无', value: -1 },
    { title: '手绘', value: -2 },
    {
      title: '直流',
      value: 70,
      children: [
        { id: 75, title: '10电路（直流一级滤波）', value: 75, img: '/circuits/1.png' },
        { id: 76, title: '12电路（直流一级滤波）', value: 76, img: '/circuits/2.png' },
      ],
    },
  ];
  const environmentalOptions = [
    {id:62, label: '盐雾', value: 'salt_spray' },
    {id:63, label: '霉菌', value: 'mold_resistance' },
    {id:64, label: '冲击', value: 'shock_resistance' },
    {id:65, label: '振动', value: 'vibration_resistance' },
  ];

  const FIELD_DEFINITIONS = {
    circuit_diagram: { id: "58", name: "电路原理图", code: "circuit_diagram" },
    insertion_loss: { id: "59", name: "插入损耗特性", code: "insertion_loss" },
    weight: { id: "60", name: "重量", code: "weight" },
    environmental_characteristics: { id: "61", name: "环境特性", code: "environmental_characteristics" },

  };


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

       
        const [circuitDiagramResp,insertionLossResp,weightResp,environmentalResp] = await Promise.all([
          getProjectField(projectId,circuitDiagram.data.id),
          getProjectField(projectId,insertionLoss.data.id),
          getProjectField(projectId,weight.data.id),
          getProjectField(projectId,environmental.data.id),

        ]);
        console.log('打印了circuitDiagramResp 吗',circuitDiagramResp)
        console.log('打印了insertionLossResp吗',insertionLossResp)
        console.log('打印了weightResp 吗',weightResp)
        console.log('打印了environmentalResp吗',environmentalResp)
         const data = circuitDiagramResp.data;
        
      form.setFieldsValue({
        circuitType: data.circuitType || null,
        weightValue: data.weightValue || null,
        weightUnit: data.weightUnit || "g",
        insertLoss: data.insertLoss || false,
        environmentalTests: data.environmentalTests || [],
      });

      setSelectedCircuit(
        data.circuitType ? treeData.flatMap(p => p.children || []).find(item => item.value === data.circuitType) : null
      );

      setIsHandDrawn(data.circuitType === -2);
      if (data.handDrawnImage) setUploadedImage(data.handDrawnImage);
      setShowWeightInput(!!data.weightValue);
      setShowInsertLoss(!!data.insertLoss);
      setEnvironmentalTests(data.environmentalTests || []);

      setLoading(false);
    } catch (error) {
      message.error("获取数据失败");
      setLoading(false);
    }
  };

  /** **防抖处理**保存数据 */
  const debouncedSaveData = useCallback(
    debounce(async (field, value) => {
      try {
        setLoading(true);
        console.log('保存了',field,value)
        await saveProjectField()
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
    if (value === -1) {
      setSelectedCircuit(null);
      setUploadedImage(null);
      setIsHandDrawn(false);
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
    debouncedSaveData("circuitType", value);
  };

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result);
      debouncedSaveData("handDrawnImage", reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

    /** **拼接重量字符串并保存** */
    const handleWeightChange = (type, value) => {
      const updatedWeightData = { ...weightData, [type]: value };
  
      setWeightData(updatedWeightData);
  
      if (updatedWeightData.value !== null && updatedWeightData.unit) {
        const weightString = `${updatedWeightData.value}${updatedWeightData.unit}`;
        debouncedSaveData("weightValue", weightString);
      }
    };

  return (
    <Form form={form} layout="vertical" style={{ maxWidth: '1000px', margin: '0 auto', background: '#f8f8f8', padding: '20px', borderRadius: '8px' }}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item name="circuitType" label="选择滤波电路类型">
            <TreeSelect style={{ width: '100%' }} treeData={treeData} placeholder="请选择" treeDefaultExpandAll onChange={handleCircuitChange} />
          </Form.Item>
        </Col>
        {isHandDrawn && (
          <Col span={12}>
            <Form.Item label="上传手绘电路图">
              <Upload beforeUpload={handleUpload} listType="picture" showUploadList={false}>
               <Button><UploadOutlined /> 上传手绘电路图</Button> 
              </Upload>
            </Form.Item>
          </Col>
        )}
      </Row>

      {(selectedCircuit || uploadedImage) && (
        <Card title="电路图预览" style={{ marginBottom: 20, textAlign: 'center' }}>
          <img alt="电路图" src={uploadedImage || selectedCircuit?.img} style={{ width: '100%', maxWidth: '400px', height: 'auto', objectFit: 'contain' }} />
        </Card>
      )}

      <Divider />

      <Form.Item>
        <Checkbox checked={showInsertLoss} onChange={(e) => {
          setShowInsertLoss(e.target.checked);
          debouncedSaveData("insertion_loss", e.target.checked);
        }}>
          插入损耗特性
        </Checkbox>
      </Form.Item>

      <Divider />
      <Form.Item>
        <Checkbox checked={showWeightInput} onChange={(e) => {
          setShowWeightInput(e.target.checked);
          if (!e.target.checked) {
            setWeightData({ value: null, unit: "kg" });
            debouncedSaveData("weightValue", null);
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

      <Divider />

      <Form.Item name="environmentalTests" label="环境特性">
        <Checkbox.Group options={environmentalOptions} onChange={(values) => {
          setEnvironmentalTests(values);
          debouncedSaveData("environmental_characteristics", values);
        }} value={environmentalTests} />
      </Form.Item>
    </Form>
  );
};

export default CircuitAndLossForm;
