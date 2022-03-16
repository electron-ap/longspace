import logo from "../../../assets/logo.png"
import React from "react";

import { Avatar, Badge, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.css'

const content = (
  <div className="myusertent">
    <div className="myusertent01">当前账号</div>
    <div className="myusertent02">FZ0001</div>
    <div className="myusertent03">收藏夹</div>
    <div className="myusertent04">退出登录</div>
  </div>
);

const Myheader = () => {

    return (
        <>
            <div className="header-wraper">
                <div className="header">
                    <img src={logo} className="my-logo" alt="logo" />  
                    <div className="search-wraper"> 
                        <input
                            className="search"
                            type="text" 
                            placeholder="输入关键词搜索课程等信息"
                        />
                        <button className="btn">Search</button>
                    </div>
                    <div className="myuser">
                        <span className="myuser-avatar-item avatar-item">
                            <Badge count={1}>
                                <Avatar shape="square" icon={<UserOutlined />} />
                            </Badge>
                        </span>
                        <div className="myuserid">
                        <Popover content={content} placement="bottom" trigger="hover">
                            <img className="myuseridpct"  alt="用户" src={require("../../../assets/userImageId1.png")} />
                        </Popover>
                            <img className="myuseridnm" alt="用户头像2" src={require("../../../assets/userImageIdsm1.png")} />
                            <span className="myuseridonnm">Language<i className="ibn"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Myheader