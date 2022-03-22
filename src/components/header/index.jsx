import logo from "../../assets/logo.png"
<<<<<<< HEAD
import React from "react";
import { withRouter, Redirect, useHistory,Link } from 'react-router-dom';
import { Avatar, Badge, Popover, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.scss'

const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
=======
import React,{useEffect,useState} from "react";
import { useHistory,Link } from 'react-router-dom';
import { Avatar, Badge, Popover } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import './index.scss'
import { userInfo } from "../../libs/api"
>>>>>>> 076f52f93575177eb627961d02e5617820acb85b


const Myheader = () => {
    const [memberInfo,setMemberInfo] = useState({})
    const history = useHistory();
    const handleLogout = ()=>{
        history.push("/")
    }

    useEffect(()=>{
        userInfo().then(res=>{
            if(res.code === 200 ){
                setMemberInfo(res.data)
            }
        }).catch(err=>{})
    },[])
    const content = (
        <div className="myusertent">
            <div className="myusertent01">当前账号</div>
            <div className="myusertent02"><Link to={{pathname:"/agent/member",state:{tabIndex:0}}}>{memberInfo.account}</Link></div>
            <div className="myusertent03"><Link to={{pathname:"/agent/member",state:{tabIndex:1}}}>收藏夹</Link></div>
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
                            <div className="language-lect">
                    <Select defaultValue="enlish" dropdownMatchSelectWidth={false} onChange={handleChange}>
                                <Option value="china"><span className="lg-zh">中 文</span></Option>
                                <Option value="enlish"><span className="lg-en">English</span></Option>
                            </Select>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{height:'90px'}}></div>
        </>
    )
}
export default Myheader