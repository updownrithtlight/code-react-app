// api-config.js

let baseURL;

// 开发环境直接请求后端 API
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
 
    if (window.location.port === '3000') {
  //  // 本地开发时直接连接后端
        baseURL = 'http://localhost:5000/api'; // 本地前端（3000）请求后端（8080）
    } else {
        baseURL = '/api';
    }
} else {
    // 生产环境通过 Nginx 代理
    baseURL = '/api';  // 生产环境请求通过 Nginx 转发
}

export { baseURL };

