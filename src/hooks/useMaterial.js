// File: src/hooks/useMaterial.js

import { useState,useCallback } from 'react';
import { getMaterials, getMaterialById, saveMaterial, deleteMaterial,
  importExcel  
 } from '../api/material/MaterialService';

/**
 * Hook: useMaterials
 * 管理 material 数据的获取、保存和删除逻辑
 */
const useMaterials = () => {
  const [data, setData] = useState([]); // 数据列表
  const [loading, setLoading] = useState(false); // 加载状态
  const [error, setError] = useState(null); // 错误状态
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 }); // 分页状态

  // 获取列表数据
  const fetchData = useCallback(async ( page, pageSize,queryParams  = {}) => {
    setLoading(true);
    try {
      const response = await getMaterials({
        page: page || pagination.current-1,
        pageSize: pageSize || pagination.pageSize,
        material_code:queryParams.material_code,
        material_name:queryParams.material_name,
        model_specification:queryParams.model_specification,
      });
      setData(response.data.materials);
      // setPagination({ ...pagination, total: response.data.totalElements });


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
  // 获取单条数据
  const fetchById =useCallback( async (id) => {
    try {
      const response = await getMaterialById(id);
      return response;
    } catch (err) {
      setError(err);
    }
  }, []);

  // 保存（新增或编辑）数据
  const save = useCallback(async (data) => {
    try {
      const response =  await saveMaterial(data);
      // fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
      return response;
    } catch (err) {
      setError(err);
    }
  }, [fetchData, pagination.current-1, pagination.pageSize]);

  // 删除数据
  const remove = useCallback(async (id) => {
    try {
      await deleteMaterial(id);
      fetchData({ page: pagination.current-1, pageSize: pagination.pageSize }); // 刷新列表
    } catch (err) {
      setError(err);
    }
  }, [fetchData, pagination.current-1, pagination.pageSize]);


   // **导入 Excel 文件**
   const uploadExcel = useCallback(async (file) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      
      const response = await importExcel(formData);
   
      fetchData(pagination.current, pagination.pageSize); // 重新获取数据
      return response;
    } catch (err) {
       setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchData, pagination.current, pagination.pageSize]);

  return {
    data,
    loading,
    error,
    pagination,
    fetchData,
    fetchById,
    save,
    remove,
    uploadExcel, // 公开上传 Excel 的方法
  };
};

export default useMaterials;
