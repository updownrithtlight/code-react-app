import React, { useState } from 'react';
import { Form, TreeSelect, Card, Button } from 'antd';

const ProductDetails = () => {
  // 树形数据
  const technicalFeaturesData = [
    { title: '产品尺寸小，外观美观。', value: 'feature1' },
    { title: '产品的元器件和外壳可以实现100%国产化。', value: 'feature2' },
    { title: '产品内部电子元器件的质量等级为普军级及以上等级。', value: 'feature3' },
  ];

  const usagePrecautionsData = [
    { title: '1）产品应存放在环境温度为-10℃～40℃，相对湿度小于80%，周围环境无酸性、碱性及其他有害杂质的库房中。', value: 'precaution1' },
    { title: '2）产品在设备中安装完成后，建议引出端连接处使用三防漆、热缩管等方式作密封处理，提高系统抗高浓度盐雾、水汽等恶劣环境的能力。', value: 'precaution2' },
    { title: '3）用户应将产品外壳与用户金属机箱可靠电气搭接，并尽可能降低接地阻抗。', value: 'precaution3' },
    { title: '4）禁止反复进行耐电压和绝缘电阻测试，防止电容失效。', value: 'precaution4' },
    { title: '5）建议用户在大电流使用时充分考虑散热，建议用户通过导热/导电衬垫或导热硅脂将产品紧贴设备壳体或风冷散热。', value: 'precaution5' },
    { title: '6）如有严酷的环境要求（湿热、盐雾、霉菌等），安装后请在产品表面喷涂三防漆或其它防锈漆。', value: 'precaution6' },
    { title: '7）针对引出端为穿心电容（焊接式）的产品，焊接前应提前将穿心电容引脚与所连接的导线上锡，焊接时焊接温度≤280℃，焊接时间≤3秒，焊点离穿心电容壳体3毫米之外。在安装过程中切勿让穿心电容承受轴向或径向受力。', value: 'precaution7' },
    { title: '8）针对引出端为螺栓的产品，应注意接线方法和控制安装扭力，避免由螺栓转动而造成的内部线路故障或质量隐患。紧固螺钉时应按下图所示：先用扳手1固定住根部螺母避免转动，再用扳手2拧紧外侧螺母。安装扭矩建议：M6螺栓2.52N.m~2.77 N.m；M4螺栓1.09N.m~1.20 N.m。', value: 'precaution8' },
  ];

  // 状态管理
  const [selectedTechnicalFeatures, setSelectedTechnicalFeatures] = useState([]);
  const [selectedUsagePrecautions, setSelectedUsagePrecautions] = useState([]);

  // 表单提交
  const onFinish = (values) => {
    console.log('Submitted values:', values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      {/* 产品技术特点选择器 */}
      <Form.Item
        name="technicalFeatures"
        label="选择产品技术特点"
        rules={[{ required: false }]}
      >
        <TreeSelect
          treeData={technicalFeaturesData.map((item) => ({ title: item.title, value: item.value }))}
          value={selectedTechnicalFeatures}
          onChange={setSelectedTechnicalFeatures}
          treeCheckable={true}
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          placeholder="请选择产品技术特点"
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/* 动态显示已选择的产品技术特点 */}
      {selectedTechnicalFeatures.map((item) => {
        const selectedFeature = technicalFeaturesData.find((feature) => feature.value === item);
        return (
          selectedFeature && (
            <Card key={item} style={{ marginTop: 20 }}>
              <p>{selectedFeature.title}</p>
            </Card>
          )
        );
      })}

      {/* 使用注意事项选择器 */}
      <Form.Item
        name="usagePrecautions"
        label="选择使用注意事项"
        rules={[{ required: false }]}
      >
        <TreeSelect
          treeData={usagePrecautionsData.map((item) => ({ title: item.title, value: item.value }))}
          value={selectedUsagePrecautions}
          onChange={setSelectedUsagePrecautions}
          treeCheckable={true}
          showCheckedStrategy={TreeSelect.SHOW_PARENT}
          placeholder="请选择使用注意事项"
          style={{ width: '100%' }}
        />
      </Form.Item>

      {/* 动态显示已选择的使用注意事项 */}
      {selectedUsagePrecautions.map((item) => {
        const selectedPrecaution = usagePrecautionsData.find((precaution) => precaution.value === item);
        return (
          selectedPrecaution && (
            <Card key={item} style={{ marginTop: 20 }}>
              <p>{selectedPrecaution.title}</p>
            </Card>
          )
        );
      })}

      {/* 提交按钮 */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductDetails;
