import React, { useEffect,} from 'react';
import { Pagination, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import useProject from '../../hooks/useProject';
import SearchProject from '../../components/project/SearchProject';
import ProjectTable from '../../components/project/ProjectTable';


const ProjectListPage = () => {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [queryParams, setQueryParams] = React.useState({
    project_name: '',
    project_model: '',
    project_type: '',
    working_temperature: '',
    storage_temperature: '',
   });
   const navigate = useNavigate();

  const {
    data,
    pagination,
    loading,
    remove,
    fetchData,
  } = useProject();

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
      project_name: '',
      project_model: '',
      project_type: '',
      working_temperature: '',
      storage_temperature: '',
    });
    fetchData(1, pagination.pageSize, {
      project_name: '',
      project_model: '',
      project_type: '',
      working_temperature: '',
      storage_temperature: '',
    });
  };

 

  const handleReadColumns = (record) => {
    navigate(`/document_form_page/${record.id}`);
  };


  
  const handleCreate = () => {
    navigate(`/document_form_page`);
  };

  const handleMaterialTable = (record) => {
    console.log('测试',record)
    navigate(`/project/${record.id}/materials`);
   };

  const handlePageChange = (page, pageSize) => {
    fetchData(page, pageSize, queryParams);
  };


  return (
    <div style={{ padding: '2px' }}>
      <SearchProject
        queryParams={queryParams}
        onQueryParamChange={handleQueryParamChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />
       <Button type="primary" onClick={handleCreate}>
          新建项目
        </Button>        
      <ProjectTable
        data={data}
        selectedRows={selectedRows}
        onSelectChange={setSelectedRows}
        onReadColumns={handleReadColumns}
        onEdit={handleMaterialTable}
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
    </div>
  );
};

export default ProjectListPage;
