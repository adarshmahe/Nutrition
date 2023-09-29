import axios from 'axios';
import { message } from '../pages/consumer-theater-page.jsx';

let refreshFlag = false;

// create an axios instance
const service = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_PYTHON_API_URL,
  timeout: 0 // 不限制超时，因为有些接口等待时间会很长
});

// request interceptor
service.interceptors.request.use(config => {
  let token = sessionStorage.getItem('jwt-access-token');
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }
  config.headers['X-ZUMO-AUTH'] = window.sessionStorage.getItem('aad-token')
  return config;
}, error => {
  return Promise.reject(error);
});

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status !== 200) {
      const res = response.data;
      message.error(res.message);
      return Promise.reject(res);
    }
    if (response.config.originData) {
      return response;
    }
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      if (refreshFlag) {
        return Promise.reject(error);
      }
      refreshFlag = true;
      message.error('Login expired. Trying to log in again');
      sessionStorage.removeItem('jwt-access-token');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
    if (error.response && error.response.status === 500) {
      error.response.data.message && message.error(error.response.data.message);
    }
    return Promise.reject(error);
  });

export default service;