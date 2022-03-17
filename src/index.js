// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './App.scss'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less's


ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
