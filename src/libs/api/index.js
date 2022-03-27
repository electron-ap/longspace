import request from "../http/request";

export const base_url = "http://fuzhi.forwap.cn"
// 用户登录
export const getImgCode = (params = {}) => request.get("login/yzm", { params });
export const login = (data = {}) => request.post("login/index", data);
export const sendYzm = (data = {}) => request.post("login/sendYzm", data);
export const savePassword = (data = {}) => request.post("login/savePassword", data);

export const userInfo = (params = {}) => request.get("user/index", { params });//个人信息
export const userSave = (data = {}) => request.post("user/save", data); //个人信息修改
export const userModifyPwd = (data = {}) => request.post("user/save", data); //密码修改

export const favoritesList = (params = {}) => request.get("Favorites/getList", { params });//收藏夹列表
export const favoritesRemove = (data = {}) => request.post("Favorites/remove", data); //移除收藏

export const myMemberList = (params = {}) => request.get("Member/getList", { params });//我的成员列表
export const myMemberApply = (data = {}) => request.post("Member/apply", data);//成员申请
export const myMemberRemove = (data = {}) => request.post("Member/remove", data);//成员删除申请

//成员信息一览与操作 
export const memberCourseList = (params = {}) => request.get("Member/getCourseList", { params });//课程列表，学习中，已完成
export const memberCourseOnOff = (data = {}) => request.post("Member/setCourse", data);//开放、关闭课程
export const memberExamList = (params = {}) => request.get("Member/getTestList", { params });//成员考试列表
export const memberCertList = (params = {}) => request.get("Member/getCertList", { params });//成员证书列表
export const memberExamReOpen = (data = {}) => request.post("Member/setCourse", data);//重开考试

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

export const examList = (params = {}) => request.get("exam/getList", { params });//考试列表
export const examEnter = (params = {}) => request.get("exam/test", { params });//进入考试
export const examPreNext = (data = {}) => request.post("Exam/next", data); //获取试题【下一题，上一题
export const examSubmit = (data = {}) => request.post("Exam/submit", data); //提交【修改】答案
export const examProgress = (params = {}) => request.get("exam/getProgress", { params });//考试进度
export const examResult = (params = {}) => request.get("exam/result", { params });//考试结果查询

export const startCourse = (data = {}) => request.post("Course/study", data); // 课程学习时间记录


export const certList = (params = {}) => request.get("Cert/getList", { params });//考试列表








