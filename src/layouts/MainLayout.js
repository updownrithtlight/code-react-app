import React from 'react';
import { Layout, Menu,  } from 'antd';
import { Link, useLocation } from 'react-router-dom';
// import { DownOutlined, UserOutlined } from '@ant-design/icons';
import useMenu from '../hooks/useMenu';
import Header from '../components/Header';

import '../assets/styles/MainLayout.css';

const {  Sider, Content } = Layout;

const MainLayout = ({ children }) => {
  const { menuData, loading, error } = useMenu();
  const location = useLocation();
  // 根据当前路径动态显示菜单标题
  const currentMenu = menuData.find((menu) => menu.path === location.pathname);

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: '20%' }}>Loading menu...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%', color: 'red' }}>
        Failed to load menu: {error.message}
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧菜单 Sider */}
      <Sider className="ant-layout-sider" width={200} breakpoint="lg" collapsedWidth="80">
        <div className="logo">CODE-GEN</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {menuData.map((menuItem) => (
            <Menu.Item key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>

      {/* 主体布局 */}
      <Layout>
        {/* Header */}
        <Header currentMenuTitle={currentMenu?.name} />
        {/* Content */}
        <Content className="ant-layout-content">{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
