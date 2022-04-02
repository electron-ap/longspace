// 普通路由，无需登录
import Login from "../pages/user/Login";
import ForgetPwd from "../pages/user/ForgetPwd";
import PageNotFound from "../pages/errors/PageNotFound";

// 后台路由，需要登录
import Dashboard from "../pages/Home/Dashboard";
import DigitalChannels from '../pages/digital/Channels';
import TradeShow from "../pages/tradeshow/Index"
import Academy from '../pages/academy/Academy';
import CourseDetail from '../pages/academy/Course/Detail';
import CourseDetailFile from '../pages/academy/Course/DetailFile';
import CourseList from '../pages/academy/Course/Course';
import StudyList from '../pages/academy/Study/Study';
import Finished from '../pages/academy/Finished/Finished';
import ExamList from '../pages/academy/Exam/Exam';
import CertList from '../pages/academy/Cert/Cert';
import Testing from '../pages/academy/Test/Test'; // 考试页面
import FileDetail from '../pages/file/FileDetail'; // 文件详情

import MemberIndex from "../pages/member/Index"
// import Account from "../pages/member/Account"
// import Staff from "../pages/member/Staff"
// import Favorites from "../pages/member/Favorites"

export const webRoutes = [
    {
        path: "/",
        component: Login,
        exact: true
    },
    {
        path: "/user/forgetpwd",
        component: ForgetPwd,
        exact: true
    },
    {
        path: "/CourseDetailFile/:id",
        component: CourseDetailFile,
        title: "Detail",
        display: true,
        exact: false,
        children: [],
    },
    {
        path: "/FileDetail",
        component: FileDetail,
        title: "FileDetail",
        display: true,
        exact: false,
        children: [],
    },
    {
        path: '/404',
        component: PageNotFound
    }
]

export const adminRoutes = [
    {
        path: "/agent/dashboard",
        component: Dashboard,
        title: "仪表盘",
        display: true,
        exact: true,
        children: []
    },
    {
        path: "/agent/digital/channels",
        component: DigitalChannels,
        title: "DigitalChannels",
        display: true,
        exact: false,
        children: []
    },
    {
        path: "/agent/courseDetail/:id",
        component: CourseDetail,
        title: "CourseDetail",
        display: true,
        exact: false,
        children: []
    },
    {
        path: "/agent/tradeShow/",
        component: TradeShow,
        title: "TradeShow",
        display: true,
        exact: false,
        children: []
    },
    {
        path: "/agent/academy/",
        component: Academy,
        title: "Academy",
        display: true,
        exact: false,
        children: [
            {
                path: "/agent/academy/CourseList/:user_id?",
                component: CourseList,
                title: "CoursseList",
                display: true,
                exact: false,
                children: []
            },
            {
                path: "/agent/academy/StudyList/:user_id?",
                component: StudyList,
                title: "StudyList",
                display: true,
                exact: false,
                children: []
            },
            {
                path: "/agent/academy/Finished/:user_id?",
                component: Finished,
                title: "Finished",
                display: true,
                exact: false,
                children: []
            },
            {
                path: "/agent/academy/ExamList/:user_id?",
                component: ExamList,
                title: "ExamList",
                display: true,
                exact: false,
                children: []
            },
            {
                path: "/agent/academy/CertList/:user_id?",
                component: CertList,
                title: "CertList",
                display: true,
                exact: false,
                children: []
            },
            {
                path: "/agent/academy/Testing/:topic",
                component: Testing,
                title: "Testing",
                display: true,
                exact: false,
                children: []
            },
        ],
    },
    {
        path: "/agent/member",
        component: MemberIndex,
        title: "member",
        display: true,
        exact: false,
        children: [],
    }
]
