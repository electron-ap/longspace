// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './App.scss'
import 'antd/dist/antd.less'; // or 'antd/dist/antd.less's
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zhCN');

ReactDOM.render(
    <BrowserRouter>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
