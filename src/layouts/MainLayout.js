import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import useMenu from '../hooks/useMenu';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }) => { // 接受子组件作为内容
  const { menuData, loading, error } = useMenu();

  if (loading) {
    return <div>Loading menu...</div>; // 菜单加载中
  }

  if (error) {
    return <div>Failed to load menu: {error.message}</div>; // 加载失败
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {menuData.map((menuItem) => (
            <Menu.Item key={menuItem.id}>
              <Link to={menuItem.path}>{menuItem.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px' }}>
          {children} {/* 渲染子组件 */}
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
