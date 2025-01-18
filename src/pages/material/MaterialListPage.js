import React, { useEffect, useState } from 'react';
import { Pagination, Button, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useMaterial from '../../hooks/useMaterial';
import SearchMaterial from '../../components/material/SearchMaterial';
import MaterialTable from '../../components/material/MaterialTable';


const MaterialListPage = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [queryParams, setQueryParams] = useState({
    material_code: '',
    material_name: '',
    model_specification: '',
  });

  const { data,     pagination = { current: 1, pageSize: 10, total: 0 },
     loading, remove, fetchData , uploadExcel } = useMaterial();

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, queryParams);
  }, [fetchData, pagination.current, pagination.pageSize, queryParams]);

  const handleQueryParamChange = (key, value) => {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchData(1, pagination.pageSize, queryParams);
  };

  const handleReset = () => {
    setQueryParams({
      material_code: '',
      material_name: '',
      model_specification: '',
    });
    fetchData(1, pagination.pageSize, {
      material_code: '',
      material_name: '',
      model_specification: '',
    });
  };

  const handleReadColumns = (record) => {
    navigate(`/document_form_page/${record.id}`);
  };

  const handlePageChange = (page, pageSize) => {
    fetchData(page, pageSize, queryParams);
  };

  // 📌 **文件上传处理**
   // **📌 处理 Excel 文件上传**
   const handleUpload = async (file) => {
    try {
      await uploadExcel(file);
      message.success('文件上传成功，数据已更新');
    } catch (error) {
      message.error('文件上传失败');
    }
  };

  return (
    <div style={{ padding: '2px' }}>
      {/* 搜索组件 */}
      <SearchMaterial
        queryParams={queryParams}
        onQueryParamChange={handleQueryParamChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 导入按钮 */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <Upload
          customRequest={({ file, onSuccess }) => {
            handleUpload(file);
            setTimeout(() => onSuccess('ok'), 0);
          }}
          showUploadList={false}
          accept=".xlsx, .xls, .csv" // 只允许 Excel 和 CSV 文件
        >
          <Button type="primary" icon={<UploadOutlined />}>
            导入数据
          </Button>
        </Upload>
      </div>

      {/* 数据表格 */}
      <MaterialTable
        data={data}
        selectedRows={selectedRows}
        onSelectChange={setSelectedRows}
        onReadColumns={handleReadColumns}
        onDelete={remove}
        loading={loading}
      />

      {/* 分页 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
        <Pagination
            current={Number(pagination.current) || 1}
            total={Number(pagination.total) || 0}
            pageSize={Number(pagination.pageSize) || 10}
            onChange={handlePageChange}
            showSizeChanger
            pageSizeOptions={["10", "20", "50"]} // 确保是字符串数组
            showQuickJumper
            showTotal={(total) => `共 ${total} 条数据`}
        />
      </div>
    </div>
  );
};

export default MaterialListPage;
