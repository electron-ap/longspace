// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

// import 'antd/dist/antd.css'; // or 'antd/dist/antd.less's
import 'antd/dist/antd.less';
import './App.scss'



ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);
