import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DynamicRoutes from './DynamicRoutes';
import LoginPage from '../pages/LoginPage';
import NoPermissionPage from '../pages/NoPermissionPage';
import DocumentFormPage from '../pages/DocumentFormPage';
import MaterialSearchAreaWrapper from '../pages/MaterialSearchAreaWrapper';

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
    <Route path="/document_form_page/:id" element={<MainLayout><DocumentFormPage /></MainLayout>} />
    <Route path="/document_form_page" element={<MainLayout><DocumentFormPage /></MainLayout>} />
    <Route path="/project/:projectId/materials" element={<MainLayout><MaterialSearchAreaWrapper /></MainLayout>} />


    {/* 404 页面 */}
    <Route path="*" element={<Navigate to="/no-permission" />} />
  </Routes>
);

export default AppRoutes;
