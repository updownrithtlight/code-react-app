import axios from 'axios';
import store from '../state/store';
import { clearAuthState, setAuthState} from '../state/authSlice';
import { createBrowserHistory } from 'history';
import { baseURL } from './api-config'; // Import baseURL from configuration file

const history = createBrowserHistory();

const apiClient = axios.create({
  baseURL: baseURL, // Use the imported baseURL
  headers: {
    'Content-Type': 'application/json',
  },
    withCredentials: true, // Allow HttpOnly Cookie

});

// Request Interceptor to add Authorization header
apiClient.interceptors.request.use(
  (config) => {
    const access_token = sessionStorage.getItem('access_token');
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => response, // Directly return response if successful
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;

      if (status === 401 && !originalRequest._retry) {
        originalRequest._retry = true; // Mark as retried

        try {
          // Attempt to refresh the session
          const refreshResponse = await axios.post(
            `${baseURL}/auth/refresh-token`,
            {}, // No body needed since cookies are used for Refresh Token
            { withCredentials: true }
          );
          console.log('refresh',refreshResponse.data)
          // Store the new Access Token
          const { access_token } = refreshResponse.data.data;
          sessionStorage.setItem('access_token', access_token);
          store.dispatch(setAuthState({ isAuthenticated: true })); // 更新 Redux 状态
          // Retry original request
          originalRequest.headers['Authorization'] = `Bearer ${access_token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear auth state and redirect to login
          store.dispatch(clearAuthState());
          history.push('/login');
          return Promise.reject(refreshError);
        }
      }

      if (status === 401) {
        // Directly clear state and redirect for other 401 errors
        store.dispatch(clearAuthState());
        history.push('/login');
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
