import logo from "../../assets/logo.png"
import React, { useEffect, useState } from "react";
import { useHistory, Link } from 'react-router-dom';
import { Avatar, Badge, Popover, Select } from 'antd';
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
                localStorage.setItem("userType",res.data.type)
            }
        }).catch(err => { })
    }, [])

    const handleSearch = () =>{
        history.push({pathname:"/agent/academy/CourseList",state:{keyword}})
    }
    const content = (
        <div className="myusertent">
            <div className="myusertent01">{langConfig.current_acc_text}</div>
            <div className="myusertent02"><Link to={{ pathname: "/agent/member", state: { tabIndex: 0 } }}>{memberInfo.account}</Link></div>
            <div className="myusertent03"><Link to={{ pathname: `/agent/member`, state: { tabIndex: 1 } }}>{langConfig.favorites}</Link></div>
            <div className="myusertent04" onClick={handleLogout}>{langConfig.logout}</div>
        </div>
    );
    return (
        <>
            <div className="header-wraper">
                <div className="header">
                    <Link to="/agent/dashboard"><img src={logo} className="my-logo" alt="logo" /></Link>
                    <div className="search-wraper">
                        <input
                            className="search"
                            type="text"
                            placeholder="输入关键词搜索课程等信息"
                            onChange={(e)=>{setKeyword(e.target.value)}}
                        />
                        <button className="btn" onClick={()=>handleSearch()}>搜索</button>
                    </div>
                    <div className="myuser">
                        <span className="myuser-avatar-item avatar-item">
                            <Badge count={0}>
                                <Avatar shape="square" icon={<UserOutlined />} />
                            </Badge>
                        </span>
                        <div className="myuserid">
                            <Popover content={content} placement="bottom" trigger="hover">
                                <img className="myuseridpct" alt="用户" src="/assets/userImageId1.png" />
                            </Popover>
                            <div className="language-lect">
                                {/* { langConfig.name} */}
                                <Select onChange={(e) => {changeLang(e);window.location.reload()}} value={lang} dropdownMatchSelectWidth={false} >
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