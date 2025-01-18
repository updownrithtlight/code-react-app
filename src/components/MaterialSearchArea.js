import React, { useState, useEffect } from 'react';
import { Row, Col, Input, List, Checkbox, Button, Card, Pagination, message } from 'antd';
import useMaterial from '../hooks/useMaterial';
import useProjectMaterials from '../hooks/useProjectMaterials';
import { downloadFileByProjectId } from '../api/ExcelGenerateService'; // 假设已实现 GET 文件下载
import { DownloadOutlined} from '@ant-design/icons';
const MaterialSearchArea = ({ projectId }) => {
  const [queryParams, setQueryParams] = useState({
    material_code: '',
    material_name: '',
    model_specification: '',
  });

  // 搜索区域数据
  const { data: searchMaterials, pagination, fetchData } = useMaterial();

  // 工作区域逻辑
  const {
    data: projectMaterials,
    loading: projectLoading,
    fetchMaterials,
    saveMaterial,
    removeMaterial,
  } = useProjectMaterials();

  // 初次加载工作区域的材料
  useEffect(() => {
    fetchMaterials(projectId);
  }, [projectId, fetchMaterials]);

  // 搜索区域：更新搜索参数
  const handleSearchChange = (field, value) => {
    setQueryParams((prev) => ({ ...prev, [field]: value }));
  };

  // 搜索区域：执行搜索
  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, queryParams);
  }, [fetchData, pagination.current, pagination.pageSize, queryParams]);

  // 检查材料是否已在工作区域中
  const isMaterialSelected = (materialId) =>
    projectMaterials.some((item) => item.material_id === materialId);

  // 工作区域：保存选中的材料
  const handleSelectMaterial = async (material) => {
    if (!isMaterialSelected(material.id)) {
      try {
        await saveMaterial(projectId, material.id);
        message.success('材料已保存到工作区域');
        fetchMaterials(projectId); // 刷新工作区域列表
      } catch (err) {
        message.error('保存失败，请重试！');
      }
    }
  };

  // 工作区域：移除选中的材料
  const handleRemoveMaterial = async (material) => {
    try {
      await removeMaterial(projectId, material.material_id);
      message.success('材料已从工作区域移除');
      fetchMaterials(projectId); // 刷新工作区域列表
    } catch (err) {
      message.error('删除失败，请重试！');
    }
  };



  const handleGenerateExcel = async () => {
    try {
      // 调用下载 API
      await downloadFileByProjectId(projectId);
      message.success('物料表 BOM Excel 已生成并下载');
    } catch (error) {
      console.error(error);
      message.error('生成 Excel 失败，请重试');
    }
  };

  return (
    <Row gutter={16}>
      {/* 左侧：搜索框和列表 */}
      <Col span={12}>
        <Card title="材料搜索" bordered>
          <Row gutter={16}>
            {/* 材料编码 */}
            <Col span={8}>
              <Input
                placeholder="材料编码"
                value={queryParams.material_code}
                onChange={(e) => handleSearchChange('material_code', e.target.value)}
              />
            </Col>

            {/* 材料名称 */}
            <Col span={8}>
              <Input
                placeholder="材料名称"
                value={queryParams.material_name}
                onChange={(e) => handleSearchChange('material_name', e.target.value)}
              />
            </Col>

            {/* 型号规格 */}
            <Col span={8}>
              <Input
                placeholder="型号规格"
                value={queryParams.model_specification}
                onChange={(e) => handleSearchChange('model_specification', e.target.value)}
              />
            </Col>
          </Row>

          <List
            dataSource={searchMaterials}
            renderItem={(item) => (
              <List.Item>
                <Checkbox
                  checked={isMaterialSelected(item.id)}
                  onChange={() => handleSelectMaterial(item)}
                >
                  {item.material_code} | {item.material_name} | {item.model_specification}
                </Checkbox>
              </List.Item>
            )}
          />

          {/* 分页组件 */}
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={(page, pageSize) => fetchData(page, pageSize)}
            style={{ marginTop: 16, textAlign: 'right' }}
          />
        </Card>
      </Col>

      {/* 右侧：工作区域 */}
      <Col span={12}>
        <Card title="工作区域" bordered     extra={
  <Button
  type="primary"
  size="large"
  icon={<DownloadOutlined style={{ fontSize: '16px', marginRight: '8px' }} />}
  onClick={handleGenerateExcel}
  style={{
    backgroundColor: '#52c41a',
    borderColor: '#52c41a',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '6px',
    fontWeight: 'bold',
  }}
>
生成物料表 BOM Excel
</Button> 
      }>
          <List
            loading={projectLoading}
            dataSource={projectMaterials}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button type="link" danger onClick={() => handleRemoveMaterial(item)}>
                    移除
                  </Button>,
                ]}
              >
                {item.material_code} - {item.material_name} - {item.model_specification}
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default MaterialSearchArea;
