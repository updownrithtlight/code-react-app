// File: src/routes/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // 加载中
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // 未登录跳转到登录页面
  }

  return children;
};

export default ProtectedRoute;
