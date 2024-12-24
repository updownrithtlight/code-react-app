// File: src/state/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // 修改为 authReducer

const store = configureStore({
  reducer: {
    auth: authReducer, // 使用 authReducer 替代 userReducer
  },
});

export default store;
