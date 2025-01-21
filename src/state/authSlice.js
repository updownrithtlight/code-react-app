// File: src/state/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) || false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action) {
      const { isAuthenticated, } = action.payload;
      state.isAuthenticated = isAuthenticated;
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));

    },
    clearAuthState(state) {
      state.isAuthenticated = false;
      localStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('access_token'); // 清除 Token
    },
  },
});

export const { setAuthState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
