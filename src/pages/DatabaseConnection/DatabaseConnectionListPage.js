import React, { useEffect,useState } from 'react';
import { Pagination, Button } from 'antd';

import { useNavigate } from 'react-router-dom';
import useDatabaseConnection from '../../hooks/useDatabaseConnection';
import SearchDatabaseConnectionComponent from '../../components/DatabaseConnection/SearchDatabaseConnectionComponent';
import DatabaseConnectionTable from '../../components/DatabaseConnection/DatabaseConnectionTable';
import DatabaseConnectionModal from '../../components/DatabaseConnection/DatabaseConnectionModal';

const DatabaseConnectionListPage = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [queryParams, setQueryParams] = React.useState({
    createdAt: '',
    createdBy: '',
    id: '',
    name: '',
    password: '',
    updatedAt: '',
    updatedBy: '',
    url: '',
    username: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProps, setModalProps] = useState({
    mode: 'create', // 默认为新建模式
    initialValues: {}, // 初始表单值
  });


  const {
    data,
    pagination,
    loading,
    save,
    remove,
    fetchData,
  } = useDatabaseConnection();

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, queryParams);
    console.log('页面初始化',pagination)
  }, [fetchData, pagination.current, pagination.pageSize, queryParams]);

  const handleQueryParamChange = (key, value) => {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchData(1, pagination.pageSize, queryParams);
  };

  const handleReset = () => {
    setQueryParams({
      createdAt: '',
      createdBy: '',
      id: '',
      name: '',
      password: '',
      updatedAt: '',
      updatedBy: '',
      url: '',
      username: '',
    });
    fetchData(1, pagination.pageSize, {
      createdAt: '',
      createdBy: '',
      id: '',
      name: '',
      password: '',
      updatedAt: '',
      updatedBy: '',
      url: '',
      username: '',
    });
  };

  const handleReadColumns = (id, name) => {
    navigate(`/columns/${id}/${name}`);
  };

  const handlePageChange = (page, pageSize) => {
    fetchData(page, pageSize, queryParams);
  };
  const handleCreate = () => {
    setModalProps({
      mode: 'create',
      initialValues: {}, // 新建没有初始值
    });
    setIsModalOpen(true); // 打开弹窗
  };


  const handleCloseModal = () => {
    setIsModalOpen(false); // 关闭弹窗
  };


  const handleSubmit = async (values) => {
    try {
      await save(values); // 保存数据
      setIsModalOpen(false); // 关闭弹窗
      fetchData(pagination.current, pagination.pageSize, queryParams); // 刷新列表
    } catch (err) {
      console.error('保存失败:', err);
    }
  };




  return (
    <div style={{ padding: '2px' }}>
      <SearchDatabaseConnectionComponent
        queryParams={queryParams}
        onQueryParamChange={handleQueryParamChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
       <Button type="primary" onClick={handleCreate}>
          新建
        </Button>
      <DatabaseConnectionTable
        data={data}
        selectedRows={selectedRows}
        onSelectChange={setSelectedRows}
        onReadColumns={handleReadColumns}
        onDelete={remove}
        loading={loading}
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
        <Pagination
          current={pagination.current}
          total={pagination.total}
          pageSize={pagination.pageSize}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={[10, 20, 50]}
          showQuickJumper
          showTotal={(total) => `共 ${total} 条数据`}
        />
      </div>

      {/* 弹窗 */}
      <DatabaseConnectionModal
        visible={isModalOpen}
        mode={modalProps.mode}
        initialValues={modalProps.initialValues}
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default DatabaseConnectionListPage;
