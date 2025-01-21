import React, { useState, useEffect } from 'react';
import { Row, Col, Input, List, Checkbox, Button, Card, Pagination, message, Modal } from 'antd';
import { DownloadOutlined, EyeOutlined } from '@ant-design/icons';
import useMaterial from '../hooks/useMaterial';
import useProjectMaterials from '../hooks/useProjectMaterials';
import { downloadFileByProjectId, generatematerialInfoProjectById } from '../api/ExcelGenerateService';
import { baseURL } from '../api/api-config'; // Import baseURL from configuration file
const MaterialSearchArea = ({ projectId }) => {
  const [queryParams, setQueryParams] = useState({
    material_code: '',
    material_name: '',
    model_specification: '',
  });

  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

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

  // 生成 Excel 逻辑
  const handleGenerateExcel = async () => {
    try {
      await downloadFileByProjectId(projectId);
      message.success('物料表 BOM Excel 已生成并下载');
    } catch (error) {
      console.error(error);
      message.error('生成 Excel 失败，请重试');
    }
  };

  // **📌 预览文件**
  const handlePreview = async () => {
    try {
      const response = await generatematerialInfoProjectById(projectId); // **API 请求预览文件 URL**

      if (response) {
        console.log('关于了--------',response)
        const url = `${baseURL}/office_file/preview/${response}`;
        setPreviewUrl(url);
        setPreviewUrl(url);
        setPreviewVisible(true);
      } else {
        message.error('无法预览该文件');
      }
    } catch (error) {
      message.error('预览失败，请稍后再试');
    }
  };

  return (
    <>
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
          <Card
            title="工作区域"
            bordered
            extra={
              <>
                {/* 预览按钮 */}
                <Button
                  type="default"
                  size="large"
                  icon={<EyeOutlined />}
                  onClick={handlePreview}
                  style={{
                    marginRight: '10px',
                    backgroundColor: '#f5f5f5',
                    borderColor: '#d9d9d9',
                    color: '#000',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontWeight: 'bold',
                  }}
                >
                  预览
                </Button>

                {/* 生成 Excel 按钮 */}
                <Button
                  type="primary"
                  size="large"
                  icon={<DownloadOutlined />}
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
                  生成物料表
                </Button>
              </>
            }
          >
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

      {/* PDF 预览弹窗 */}
      <Modal
        title="文件预览"
        visible={previewVisible}
        onCancel={() => setPreviewVisible(false)}
        footer={null}
        width={800}
      >
        {previewUrl ? (
          <iframe src={previewUrl} style={{ width: '100%', height: '500px', border: 'none' }} />
        ) : (
          "加载中..."
        )}
      </Modal>
    </>
  );
};

export default MaterialSearchArea;
