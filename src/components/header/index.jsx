import logo from "../../assets/logo.png"
import React from "react";
import { withRouter, Redirect, useHistory,Link } from 'react-router-dom';
import { Avatar, Badge, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.scss'



const Myheader = () => {
    const history = useHistory();
    const handleLogout = ()=>{
        history.push("/")
    }
    const content = (
        <div className="myusertent">
            <div className="myusertent01">当前账号</div>
            <div className="myusertent02"><Link to="/agent/member/Account">FZ0001</Link></div>
            <div className="myusertent03"><Link to="/agent/member/Favorites">收藏夹</Link></div>
            <div className="myusertent04" onClick={ handleLogout}>退出登录</div>
        </div>
    );
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
                        <button className="btn">搜索</button>
                    </div>
                    <div className="myuser">
                        <span className="myuser-avatar-item avatar-item">
                            <Badge count={1}>
                                <Avatar shape="square" icon={<UserOutlined />} />
                            </Badge>
                        </span>
                        <div className="myuserid">
                            <Popover content={content} placement="bottom" trigger="hover">
                                <img className="myuseridpct" alt="用户" src="/assets/userImageId1.png" />
                            </Popover>
                            <img className="myuseridnm" alt="用户头像2" src="/assets/userImageIdsm1.png" />
                            <span className="myuseridonnm">Language<i className="ibn"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height:'90px'}}></div>
        </>
    )
}
export default Myheader