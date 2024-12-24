import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthState, clearAuthState } from '../state/authSlice';
import { loginApi, logoutApi, getUserInfoApi } from '../api/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useSelector((state) => state.auth); // 从 Redux 获取认证状态
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // 加载状态

  // 初始化：检查用户登录状态
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const user = await getUserInfoApi(); // 调用 API 获取用户信息
        dispatch(setAuthState({ isAuthenticated: true, user }));
      } catch (error) {
        dispatch(clearAuthState()); // 未登录或发生错误，清除状态
        console.error('Failed to fetch user info:', error);
      } finally {
        setLoading(false); // 设置加载完成
      }
    };

    initializeAuth();
  }, [dispatch]);

  // 登录
  const login = async (credentials) => {
    try {
      const data = await loginApi(credentials); // 调用后端 API 登录
      const { user, accessToken } = data;

      sessionStorage.setItem('accessToken', accessToken); // 存储 Token
      dispatch(setAuthState({ isAuthenticated: true, user })); // 更新 Redux 状态
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // 抛出错误供调用方处理
    }
  };

  // 登出
  const logout = async () => {
    try {
      await logoutApi(); // 调用后端 API 登出
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
        loading, // 暴露加载状态
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
