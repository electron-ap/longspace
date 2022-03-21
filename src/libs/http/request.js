import axios from 'axios';
import { message } from 'antd';

message.config({
    top: `3px`,
    duration: 2,
    maxCount: 3,
});

// axios 实例配置
const request = axios.create({
    baseURL: '/api',
    timeout: 5 * 1000,
    // withCredentials:true
});

// 添加请求拦截器
request.interceptors.request.use(config => {
    if (config.headers['method'] === 'post') {
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    if (!config.headers['authorization'] && localStorage.getItem('authorization')) {
        config.headers['authorization'] = localStorage.getItem('authorization')
    }
    config.headers['language'] = localStorage.getItem('language') || 'zh-cn';
    return config
}, error => {
    return Promise.reject(error);
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    if (response.status === 200) { // http status  和下面的后台自定义 status 根据实际情况做对应调整
        if (typeof response.data === "string") {
            message.error(response.data);
            return Promise.reject(response.data);
        }
        const { code, msg } = response.data;
        if (code === 4000 || code === 4001) {
            message.error(msg);
            window.location.href = "/"
        } else if (![200, 201, 204,400].includes(code)) {  // 后台自定义 status
            message.error(msg);
            return Promise.reject(msg);
        }
        return response.data;
    } else {
        message.error(response);
        return Promise.reject(response.data);
    }

}, error => {
    return Promise.reject(error);
});

export default request;
