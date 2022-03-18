import request from "../http/request";

// 用户登录
export const getImgCode = (params = {}) => request.get("login/yzm", { params });
export const login = (data = {}) => request.post("login/index", data);
export const sendYzm = (data = {}) => request.post("login/sendYzm", data);
export const savePassword = (data = {}) => request.post("login/savePassword", data);

export const userInfo = (params = {}) => request.get("user/index", { params });
export const msgNotice = (params = {}) => request.get("msg/index", { params });
export const swiperList = (params = {}) => request.get("index/getAdvList", { params });

export const moduleList = (params = {}) => request.get("index/index", { params });//首页板块
export const moduleBasic = (params = {}) => request.get("index/getNavSeting", { params });//板块内容banner图和筛选显示
export const moduleDataList = (params = {}) => request.get("index/getList", { params });//板块内容列表
export const downloadFile = (data = {}) => request.post("index/fileZip", data);
export const isFavorites = (data = {}) => request.post("index/favorites", data); //收藏、取消收藏 


export const courseCalc = (data = {}) => request.post("course/index", data);
export const courseList = (params = {}) => request.get("course/getList", { params });//列表【课程、学习、已完成】
export const courseDetail = (params = {}) => request.get("course/getData", { params });//课程详情





