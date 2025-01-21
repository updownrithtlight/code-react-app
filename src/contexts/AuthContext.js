import React, { createContext, useContext, } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState, clearAuthState } from '../state/authSlice';
import { loginApi, logoutApi } from '../api/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useSelector((state) => state.auth); // 从 Redux 获取认证状态
  const dispatch = useDispatch();
  // 登录
  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials); // 调用后端 API 登录
      console.log('whad',data)
      const { access_token } = data.data;
      console.log('whad',access_token)
      sessionStorage.setItem('access_token', access_token); // 存储 Token
      dispatch(setAuthState({ isAuthenticated: true })); // 更新 Redux 状态
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // 抛出错误供调用方处理
    }
  };

  // 登出
  const logout = async () => {
    try {
      await logoutApi(); // 调用后端 API 登出
      dispatch(clearAuthState()); // 更新 Redux 状态

    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      dispatch(clearAuthState()); // 清理状态
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 自定义 Hook，简化 Context 使用
export const useAuth = () => {
  return useContext(AuthContext);
};
