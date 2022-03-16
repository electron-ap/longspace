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
        // if (['uploadFile'].includes(config.url)) {
        //     config.headers['Content-Type'] = 'multipart/form-data';
        // } else {
        //     config.headers['Content-Type'] = "application/json"
        // }
        config.headers['Content-Type'] = 'multipart/form-data';
    }
    if (!config.headers['Authorization'] && localStorage.getItem('Authorization')) {
        config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('Authorization')
    }
    return config
}, error => {
    return Promise.reject(error);
})

// 添加响应拦截器
request.interceptors.response.use(response => {
    let ERRORS = [
        { code: 400, msg: '业务错误 !' },
        { code: 401, msg: '权限不足,您可能未登录 !' },
        { code: 404, msg: '资源不存在 !' },
        { code: 405, msg: '请求 Method 有误 !' },
        { code: 429, msg: '触达限流限制 !' },
    ]
    if (response.status === 200) { // http status  和下面的后台自定义 status 根据实际情况做对应调整
        if (typeof response.data === "string") {
            message.error(response.data);
            return Promise.reject(response.data);
        }
        const { code, msg } = response.data;
        if (code === 401) {
            message.error(msg);
            window.location.href = "/"
        }
        if (![200, 201, 204].includes(code)) {  // 后台自定义 status
            // 此处其实可以直接输出返回的错误的
            let errmsg = ''
            for (let item of ERRORS) {
                if (item.code === code) {
                    errmsg = "错误代码：" + item.code + "， " + msg
                    break;
                }
            }
            if (errmsg) {
                message.error(errmsg);
                return Promise.reject(errmsg);
            }
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
