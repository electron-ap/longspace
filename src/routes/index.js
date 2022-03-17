import React from 'react'

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

import { GlobalOutlined, } from '@ant-design/icons';

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
        children: []
    },
    {
        path: "/agent/digital/list",
        component: DigitalLIst,
        title: "digitallist",
        display: true,
        children: []
    },
    {
        path: "/agent/digital/detail",
        component: DigitalDetail,
        title: "DigitalDetail",
        display: true,
        children: []
    },
    {
        path: "/agent/academy/Academy",
        component: Academy,
        title: "Academy",
        display: true,
        children: []
    },
    {
        path: "/agent/academy/courseDetail",
        component: CourseDetail,
        title: "CourseDetail",
        display: true,
        children: []
    },
]
