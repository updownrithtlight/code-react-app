import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DynamicRoutes from './DynamicRoutes';
import LoginPage from '../pages/LoginPage';
import NoPermissionPage from '../pages/NoPermissionPage';
import Columns from '../pages/Columns';

const AppRoutes = () => (
  <Routes>
    {/* 登录页 */}
    <Route path="/login" element={<LoginPage />} />

    {/* 主布局 */}
    <Route
      path="/*"
      element={
        <MainLayout>
          <DynamicRoutes />
        </MainLayout>
      }
    />

    {/* 无权限页面 */}
    <Route path="/no-permission" element={<NoPermissionPage />} />
    <Route path="/columns/:tableId/:tableName" element={<MainLayout><Columns /></MainLayout>} />

    {/* 404 页面 */}
    <Route path="*" element={<Navigate to="/no-permission" />} />
  </Routes>
);

export default AppRoutes;
