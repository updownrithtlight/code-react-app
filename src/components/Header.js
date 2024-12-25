// components/Header.js
import React from 'react';
import { Dropdown, Avatar, Menu } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css';

const Header = ({ currentMenuTitle = 'Dashboard' }) => {
  const navigate = useNavigate();

  // 用户操作下拉菜单
  const userMenu = (
    <Menu
      onClick={({ key }) => {
        if (key === '1') {
          navigate('/profile');
        } else if (key === '2') {
          navigate('/settings');
        } else if (key === '3') {
          navigate('/logout');
        }
      }}
    >
      <Menu.Item key="1">个人中心</Menu.Item>
      <Menu.Item key="2">设置</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  );

  return (
    <div className="ant-layout-header">
      <div className="header-left">{currentMenuTitle}</div>
      <div className="header-right">
        <Dropdown overlay={userMenu} trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Avatar size="small" icon={<UserOutlined />} />
            <span style={{ marginLeft: 8 }}>用户名称</span>
            <DownOutlined style={{ marginLeft: 4 }} />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;
