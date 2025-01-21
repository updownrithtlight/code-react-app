import React, { useEffect, useState } from 'react';
import { Pagination, Button, Upload, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import useUsers from '../../hooks/useUsers';
import SearchUser from '../../components/user/SearchUser';
import UserTable from '../../components/user/UserTable';


const MaterialListPage = () => {
  const navigate = useNavigate();
  const [selectedRows, setSelectedRows] = useState([]);
  const [queryParams, setQueryParams] = useState({
    user_fullname: '',
    username: '',
    status: '',
  });

  const { data,     pagination = { current: 1, pageSize: 10, total: 0 },
     loading, remove, fetchData , enable,disable } = useUsers();

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, queryParams);
  }, []);

  const handleQueryParamChange = (key, value) => {
    setQueryParams((prev) => ({ ...prev, [key]: value }));
  };

  const handleSearch = () => {
    fetchData(1, pagination.pageSize, queryParams);
  };

  const handleReset = () => {
    setQueryParams({
      user_fullname: '',
      username: '',
      status: '',
    });
    fetchData(1, pagination.pageSize, {
      user_fullname: '',
      username: '',
      status: '',
    });
  };

  const handleReadColumns = (record) => {
    navigate(`/document_form_page/${record.id}`);
  };

 

  
  const HandleswithStatus = (record) => {
    console.log('ww',record)
    if(record.status === "active"){
      disable(record.user_id)
    }else{
      enable(record.user_id)
    }
  };

  const handlePageChange = (page, pageSize) => {
    fetchData(page, pageSize, queryParams);
  };


  return (
    <div style={{ padding: '2px' }}>
      {/* 搜索组件 */}
      <SearchUser
        queryParams={queryParams}
        onQueryParamChange={handleQueryParamChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />


      {/* 数据表格 */}
      <UserTable
        data={data}
        selectedRows={selectedRows}
        onSelectChange={setSelectedRows}
        onReadColumns={handleReadColumns}
        onDelete={remove}
        onStatusChange={HandleswithStatus}
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
