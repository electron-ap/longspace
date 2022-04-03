import logo from "../../assets/logo.png"
import React, { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { Avatar, Badge, Popover, Select, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLangContext } from '../../libs/utils/context'
import { userInfo } from "../../libs/api"
import './index.scss'
import { removeToken } from "../../middleware/auth"

const { Option } = Select;

const Myheader = () => {
    // const [lang, changeLang] = useState('zh-cn');
    let _language = localStorage.getItem('language') || 'zh-cn';
    const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    const [memberInfo, setMemberInfo] = useState({})
    const [keyword, setKeyword] = useState("")
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("userType")
        removeToken()
        history.push("/")
    }

    useEffect(() => {
        setLang(lang)
    }, [lang])
    useEffect(() => {
        userInfo().then(res => {
            if (res.code === 200) {
                setMemberInfo(res.data)
                localStorage.setItem("userType", res.data.type)
            }
        }).catch(err => { })
    }, [])

    const handleSearch = () => {
        history.push({ pathname: "/agent/academy/CourseList", state: { keyword } })
    }
    const content = (
        <div className="myusertent">
            <div className="myusertent01">{langConfig.current_acc_text}</div>
            <div className="myusertent02"><Link to={{ pathname: "/agent/member", state: { tabIndex: 0 } }}>{memberInfo.account}</Link></div>
            <div className="myusertent03"><Link to={{ pathname: `/agent/member`, state: { tabIndex: 1 } }}>{langConfig.favorites}</Link></div>
            <div className="myusertent04" onClick={handleLogout}>{langConfig.logout}</div>
        </div>
    );


    //2022-04-02 新增弹窗 ↓↓
    const tidingsTent = () => {
        return (<div className="tidings-Tent">
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
        </div>)
    }
    //2022-04-02 新增弹窗 ↑↑


    return (
        <>
            <div className="header-wraper">
                <div className="header">
                    <Link to="/agent/dashboard"><img src={logo} className="my-logo" alt="logo" /></Link>
                    <Form className="search-wraper">
                        <input
                            className="search"
                            type="text"
                            placeholder={langConfig.search_text}
                            onChange={(e) => { setKeyword(e.target.value) }}
                        />
                        <button className="btn" onClick={() => handleSearch()}>搜索</button>
                    </Form>
                    <div className="myuser">
                        <span className="myuser-avatar-item avatar-item">
                            {/* 2022-04-02 新增弹窗 ↓↓ */}
                            <Popover placement="bottomRight" content={tidingsTent()} >
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
                                {/* { langConfig.name} */}
                                <Select onChange={(e) => { changeLang(e); window.location.reload() }} value={lang} dropdownMatchSelectWidth={false} >
                                    <Option value="zh-cn"><span className="lg-zh">中 文</span></Option>
                                    <Option value="en-us"><span className="lg-en">English</span></Option>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ height: '90px' }}></div>
        </>
    )
}
export default Myheader