import React, { useEffect, useState } from 'react';
import { Pagination, Modal, Descriptions, Select, message, Button, Input, Form } from 'antd';
import useUsers from '../../hooks/useUsers';
import SearchUser from '../../components/user/SearchUser';
import UserTable from '../../components/user/UserTable';
import { getRoles } from '../../api/role/RoleService';
import { updateUserRoles, saveUser } from '../../api/user/UserService';

const { Option } = Select;

const UserListPage = () => {
  const [selectedRows, setSelectedRows] = useState([]);

  // **📌 用户详情弹窗**
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]); // 存储用户角色
  const [allRoles, setAllRoles] = useState([]); // 所有角色列表
  const [isCreating, setIsCreating] = useState(false); // 是否新建模式
  const [form] = Form.useForm();

  const [queryParams, setQueryParams] = useState({
    user_fullname: '',
    username: '',
    status: '',
  });

  const { data, pagination = { current: 1, pageSize: 10, total: 0 }, loading, remove, fetchData, enable, disable, resetPassword } = useUsers();

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize, queryParams);
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    const response = await getRoles();
    setAllRoles(response.data);
  };

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

  // **📌 查看用户详情 / 编辑**
  const handleReadColumns = (record) => {
    setIsCreating(false); // 进入编辑模式
    setSelectedUser(record);
    setRoles(record.roles || []);
    setModalVisible(true);
  };

  // **📌 新建用户**
  const handleCreateUser = () => {
    setIsCreating(true); // 进入新建模式
    setSelectedUser(null);
    setRoles([]);
    form.resetFields(); // 清空表单
    setModalVisible(true);
  };

  const handleStatusChange = (record) => {
    if (record.status === "active") {
      disable(record.user_id);
    } else {
      enable(record.user_id);
    }
  };

  const handlePageChange = (page, pageSize) => {
    fetchData(page, pageSize, queryParams);
  };

  // **📌 更新用户角色**
  const handleRoleChange = (newRoles) => {
    setRoles(newRoles);
  };

  // **📌 保存用户角色**
  const handleSaveRoles = async () => {
    if (!selectedUser) return;
    const roleIds = allRoles
      .filter(role => roles.includes(role.name))
      .map(role => role.id);
    try {
      const response = await updateUserRoles(selectedUser.user_id, roleIds);
      if (response.success) {
        message.success("用户角色更新成功");
        fetchData(pagination.current, pagination.pageSize, queryParams);
        setModalVisible(false);
      } else {
        message.error("更新角色失败");
      }
    } catch (error) {
      message.error("更新角色请求失败");
    }
  };

  // **📌 提交新建用户**
  const handleSaveUser = async () => {
    try {
      const values = await form.validateFields();
      const response = await saveUser({ ...values, roles });
      if (response.success) {
        message.success("用户创建成功");
        fetchData(1, pagination.pageSize, queryParams);
        setModalVisible(false);
      } else {
        message.error("创建用户失败");
      }
    } catch (error) {
      message.error("提交失败，请检查输入");
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      {/* 🔍 搜索组件 */}
      <SearchUser
        queryParams={queryParams}
        onQueryParamChange={handleQueryParamChange}
        onSearch={handleSearch}
        onReset={handleReset}
      />

      {/* 🆕 新建用户按钮 */}
      <Button type="primary" style={{ marginBottom: '10px' }} onClick={handleCreateUser}>
        新建用户
      </Button>

      {/* 📋 数据表格 */}
      <UserTable
        data={data}
        selectedRows={selectedRows}
        onSelectChange={setSelectedRows}
        onReadColumns={handleReadColumns}
        onDelete={remove}
        onReset={resetPassword}
        onStatusChange={handleStatusChange}
        loading={loading}
      />

      {/* 📌 用户详情 & 角色管理弹窗 (共享 "新建" & "编辑") */}
      <Modal
        title={isCreating ? "创建用户" : "用户详情"}
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={isCreating ? handleSaveUser : handleSaveRoles}
        okText={isCreating ? "创建" : "保存"}
      >
        {isCreating ? (
          <Form form={form} layout="vertical">
            <Form.Item name="user_fullname" label="用户名" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input placeholder="输入用户名" />
            </Form.Item>
            <Form.Item name="username" label="登录名" rules={[{ required: true, message: '请输入登录名' }]}>
              <Input placeholder="输入登录名" />
            </Form.Item>
            <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password placeholder="输入密码" />
            </Form.Item>
            <Form.Item label="角色">
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                value={roles}
                onChange={handleRoleChange}
                placeholder="选择用户角色"
              >
                {allRoles.map(role => (
                  <Option key={role.id} value={role.name}>
                    {role.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        ) : (
          selectedUser && (
            <Descriptions bordered column={1}>
              <Descriptions.Item label="用户 ID">{selectedUser.user_id}</Descriptions.Item>
              <Descriptions.Item label="用户名">{selectedUser.user_fullname}</Descriptions.Item>
              <Descriptions.Item label="登录名">{selectedUser.username}</Descriptions.Item>
              <Descriptions.Item label="状态">
                {selectedUser.status === "active" ? "启用" : "禁用"}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">{selectedUser.created_at}</Descriptions.Item>
              <Descriptions.Item label="角色">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  value={roles}
                  onChange={handleRoleChange}
                  placeholder="选择用户角色"
                >
                  {allRoles.map(role => (
                    <Option key={role.id} value={role.name}>
                      {role.name}
                    </Option>
                  ))}
                </Select>
              </Descriptions.Item>
            </Descriptions>
          )
        )}
      </Modal>

      {/* 📌 分页 */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px 20px' }}>
        <Pagination
          current={Number(pagination.current) || 1}
          total={Number(pagination.total) || 0}
          pageSize={Number(pagination.pageSize) || 10}
          onChange={handlePageChange}
          showSizeChanger
          pageSizeOptions={["10", "20", "50"]}
          showQuickJumper
          showTotal={(total) => `共 ${total} 条数据`}
        />
      </div>
    </div>
  );
};

export default UserListPage;
