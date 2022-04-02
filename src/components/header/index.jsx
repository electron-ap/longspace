import logo from "../../assets/logo.png"

import { useHistory,Link } from 'react-router-dom';
import { Avatar, Badge, Popover, Select, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import React,{useEffect,useState} from "react";

import './index.scss'
import { userInfo } from "../../libs/api"


const { Option } = Select;

function handleChange(value) {
  console.log(`selected ${value}`);
}
//2022-04-02 新增弹窗 ↓↓
const tidingsTent = (
    <div className="tidings-Tent">
        <div className="tidings-tle">消息通知</div>
        <ul className="tidings-box">
            <li className="tidings-box-li">
                <div className="tidings-box-left">
                    <p className="tidings-box-nr">更新了新的课程10节，如果需要考试的抓紧</p>
                    <p className="tidings-box-pr">2022-12-34 34:33:00</p>
                </div>
                <span className="tidings-box-right">详情 ></span>
            </li>
            <li className="tidings-box-li">
                <div className="tidings-box-left">
                    <p className="tidings-box-nr">更新了新的课程10节，如果需要考试的抓紧</p>
                    <p className="tidings-box-pr">2022-12-34 34:33:00</p>
                </div>
                <span className="tidings-box-right">详情 ></span>
            </li>
            <li className="tidings-box-li">
                <div className="tidings-box-left">
                    <p className="tidings-box-nr">更新了新的课程10节，如果需要考试的抓紧</p>
                    <p className="tidings-box-pr">2022-12-34 34:33:00</p>
                </div>
                <span className="tidings-box-right">详情 ></span>
            </li>
        </ul>
    </div>
  );
//2022-04-02 新增弹窗 ↑↑

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
                        {/* 2022-04-02 新增弹窗 ↓↓ */}
                        <Popover placement="bottomRight" content={tidingsTent} trigger="click">
                            <div className="tidings-btn-on">
                                <Badge className="tidings-btn" count={1}>
                                    <Avatar shape="square" icon={<UserOutlined />} />
                                </Badge>
                            </div>
                        </Popover> 
                        {/* 2022-04-02 新增弹窗 ↑↑ */}
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