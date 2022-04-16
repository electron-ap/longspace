// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// 路由的配置引用
import { BrowserRouter } from 'react-router-dom';

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less's
import './App.scss'



ReactDOM.render(
    // 路由的配置构架
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
