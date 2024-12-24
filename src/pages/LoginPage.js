import React, { useState } from 'react';
import { Form, Input, Button, Alert } from 'antd';
import { useAuth } from '../contexts/AuthContext'; // 使用 AuthContext
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const { login, loading } = useAuth(); // 从 AuthContext 获取登录方法和加载状态
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    try {
      setError(null); // 清除之前的错误信息
      await login(values); // 调用 AuthContext 中的 login 方法
      navigate('/'); // 登录成功后跳转到首页
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', textAlign: 'center' }}>
      <h1>Login</h1>
      {error && <Alert type="error" message={error} style={{ marginBottom: '16px' }} />}
      <Form onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter your username!' }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter your password!' }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
