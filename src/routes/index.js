// 普通路由，无需登录
import Login from "../pages/user/Login";
import ForgetPwd from "../pages/user/ForgetPwd";
import PageNotFound from "../pages/errors/PageNotFound";

// 后台路由，需要登录
import Dashboard from "../pages/Home/Dashboard";
import DigitalLIst from '../pages/digital/DigitalLIst';
import DigitalDetail from '../pages/digital/DigitalDetail';
import Academy from '../pages/academy/Academy';
import CourseDetail from '../pages/academy/Course/Detail';
import CourseList from '../pages/academy/Course/Course';
import StudyList from '../pages/academy/Study/Study';
import Finished from '../pages/academy/Finished/Finished';
import ExamList from '../pages/academy/Exam/Exam';
import CertList from '../pages/academy/Cert/Cert';

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
        exact:true,
        children: []
    },
    {
        path: "/agent/digital/list",
        component: DigitalLIst,
        title: "digitallist",
        display: true,
        exact:false,
        children: []
    },
    {
        path: "/agent/digital/detail",
        component: DigitalDetail,
        title: "DigitalDetail",
        display: true,
        exact:true,
        children: []
    },    
    {
        path: "/agent/academy/courseDetail",
        component: CourseDetail,
        title: "CourseDetail",
        display: true,
        exact:false,
        children: []
    },
    {
        path: "/agent/academy",
        component: Academy,
        title: "Academy",
        display: true,
        exact:false,
        redirect:'/agent/academy/CourseList',
        children: [
            {
                path: "/agent/academy/CourseList",
                component: CourseList,
                title: "CourseList",
                display: true,
                exact:false,
                children: []
            },
            {
                path: "/agent/academy/StudyList",
                component: StudyList,
                title: "StudyList",
                display: true,
                exact:false,
                children: []
            },
            {
                path: "/agent/academy/Finished",
                component: Finished,
                title: "Finished",
                display: true,
                exact:false,
                children: []
            },
            {
                path: "/agent/academy/ExamList",
                component: ExamList,
                title: "ExamList",
                display: true,
                exact:false,
                children: []
            },
            {
                path: "/agent/academy/CertList",
                component: CertList,
                title: "CertList",
                display: true,
                exact:false,
                children: []
            },
        ],
    },
    
    
]
