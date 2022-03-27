import logo from "../../assets/logo.png"
import React,{useEffect,useState} from "react";
import {useHistory,Link } from 'react-router-dom';
import { Avatar, Badge, Popover, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLangContext } from '../../libs/utils/context'
import { userInfo } from "../../libs/api"
import './index.scss'

const { Option } = Select;

const Myheader = () => {
    const [lang, changeLang] = useState('zh-cn');
    const {setLang, langConfig} = useLangContext();
    const [memberInfo,setMemberInfo] = useState({})
    const history = useHistory();
    const handleLogout = ()=>{
        history.push("/")
    }

    useEffect(() => {
        setLang(lang)
    }, [lang])
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
                                    { langConfig.name}
                    <Select onChange={(e) => changeLang(e)} value={lang} dropdownMatchSelectWidth={false} >
                                <Option value="zh-cn"><span className="lg-zh">中 文</span></Option>
                                <Option value="en-us"><span className="lg-en">English</span></Option>
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