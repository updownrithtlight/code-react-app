import React, { useState } from 'react';
import { Form, TreeSelect, Card } from 'antd';

const TechnicalFeatures = () => {
  const technicalFeaturesData = [
    { title: '产品尺寸小，外观美观。', value: 'feature1' },
    { title: '产品的元器件和外壳可以实现100%国产化。', value: 'feature2' },
    { title: '产品内部电子元器件的质量等级为普军级及以上等级。', value: 'feature3' },
  ];

  const usagePrecautionsData = [
    { title: '产品应存放在适当的环境温度中。', value: 'precaution1' },
    { title: '产品应与金属机箱电气搭接，确保接地。', value: 'precaution2' },
  ];

  const [selectedTechnicalFeatures, setSelectedTechnicalFeatures] = useState([]);
  const [selectedUsagePrecautions, setSelectedUsagePrecautions] = useState([]);

  return (
    <>
      {/* 产品技术特点选择器 */}
      <Form.Item name="technicalFeatures" label="选择产品技术特点">
        <TreeSelect
          treeData={technicalFeaturesData}
          value={selectedTechnicalFeatures}
          onChange={setSelectedTechnicalFeatures}
          treeCheckable={true}
          placeholder="请选择产品技术特点"
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/* 动态显示已选择的技术特点 */}
      {selectedTechnicalFeatures.map((item) => (
        <Card key={item} style={{ marginTop: 20 }}>
          <p>{technicalFeaturesData.find((feature) => feature.value === item)?.title}</p>
        </Card>
      ))}

      {/* 使用注意事项选择器 */}
      <Form.Item name="usagePrecautions" label="选择使用注意事项">
        <TreeSelect
          treeData={usagePrecautionsData}
          value={selectedUsagePrecautions}
          onChange={setSelectedUsagePrecautions}
          treeCheckable={true}
          placeholder="请选择使用注意事项"
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/* 动态显示已选择的注意事项 */}
      {selectedUsagePrecautions.map((item) => (
        <Card key={item} style={{ marginTop: 20 }}>
          <p>{usagePrecautionsData.find((precaution) => precaution.value === item)?.title}</p>
        </Card>
      ))}
    </>
  );
};

export default TechnicalFeatures;
