import request from "../http/request";

// 用户登录
export const imgVerifyCode = (params = {}) => request.get("code", { params });
export const login = (data = {}) => request.post("login", data);

