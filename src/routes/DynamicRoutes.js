import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import useMenu from '../hooks/useMenu';
import { Spin } from 'antd';


const DynamicRoutes = () => {
  const { isAuthenticated } = useAuth();
  const { menuData, loading } = useMenu();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Spin tip="Loading routes..." />;
  }

  return (
    <Routes>
      {menuData.map((menu) => {
        const Component = React.lazy(() => import(`../pages/${menu.component}`));
        return (
          <Route
            key={menu.id}
            path={menu.path}
            element={
              <Suspense fallback={<Spin tip="Loading page..." />}>
                <Component />
              </Suspense>
            }
          />
        );
      })}
    </Routes>
  );
};

export default DynamicRoutes;
