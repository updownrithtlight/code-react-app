import { useState, useCallback } from 'react';
import { getUsers, getUserById, saveUser, deleteUser, 
    resetUserPassword, enableUser, disableUser } from '../api/user/UserService';

/**
 * Hook: useUsers
 * 管理 User 数据的获取、保存和删除逻辑
 */
const useUsers = () => {
  const [data, setData] = useState([]); // 用户数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 }); // 分页状态

  // 获取列表数据
    const fetchData = useCallback(async (page, pageSize, queryParams = {}) => {
      setLoading(true);
      try {
        const response = await getUsers({
          page: page || pagination.current-1,
          pageSize: pageSize || pagination.pageSize,
          username:queryParams.username,
          user_fullname:queryParams.user_fullname,
          status:queryParams.status,
  
        });
        setData(response.data.users);
            // ✅ 更新分页状态，确保 React 状态更新正确
               setPagination((prev) => ({
                ...prev,
                current: page,
                pageSize,
                total: response.data.totalElements,
              }));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }, []);


  // **📌 获取单个用户**
  const fetchById = useCallback(async (id) => {
    try {
      const response = await getUserById(id);
      return response;
    } catch (err) {
      setError(err);
    }
  }, []);


    // 保存（新增或编辑）数据
    const save = useCallback(async (data) => {
      try {
        const response =  await saveUser(data);
        // fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
        return response;
      } catch (err) {
        setError(err);
      }
    }, [fetchData, pagination.current-1, pagination.pageSize]);
  


    const remove = useCallback(async (id) => {
      try {
        await deleteUser(id);
        fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
      } catch (err) {
        setError(err);
      }
    }, [fetchData, pagination.current-1, pagination.pageSize]);
  

  // **📌 重置用户密码**
  const resetPassword = useCallback(async (userId) => {
    try {
      await resetUserPassword(userId);
      return { success: true, message: "Password reset successfully" };
    } catch (err) {
      setError(err);
      return { success: false, message: "Failed to reset password" };
    }
  }, []);

  // **📌 禁用用户**
  const disable = useCallback(async (userId) => {
    try {
      await disableUser(userId);
      fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
    } catch (err) {
      setError(err);
      return { success: false, message: "Failed to disable user" };
    }
  }, []);

  // **📌 启用用户**
  const enable = useCallback(async (userId) => {
    try {
      await enableUser(userId);
      fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
    } catch (err) {
      setError(err);
      return { success: false, message: "Failed to enable user" };
    }
  }, []);

  return {
    data,
    loading,
    error,
    pagination,
    fetchData,
    fetchById,
    save,
    remove,
    resetPassword,
    disable,
    enable,
  };
};

export default useUsers;
