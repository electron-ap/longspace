import React, { useState, useEffect } from 'react'
import { Form, Message } from 'antd';
import { useHistory } from 'react-router-dom';
import './login.scss'
import { login, base_url } from "../../libs/api"
import { uuid } from "../../libs/utils/function"
import { setToken } from "../../middleware/auth"
function Login() {
    useEffect(() => {
        refreshVerifyCode()
    }, [])
    const history = useHistory();
    const [clientID, setClientID] = useState('');
    const [userName, setUserName] = useState('longzy@163.com');
    const [password, setPassword] = useState('123456');
    const [verifyCode, setVerifyCode] = useState('');
    const [imgsrc, setImgSrc] = useState('');

    const handleLogin = () => {
        if (userName === "") {
            Message.error("请输入账号！");
            return false;
        }
        if (password === "") {
            Message.error("请输入密码！");
            return false;
        }
        if (verifyCode === "") {
            Message.error("请输入验证码！");
            return false;
        }
        login({ email: userName,password: password, yzm: verifyCode,guid:clientID }).then(res => {
            if (res.code !== 200) {
                Message.error(res.msg)
                refreshVerifyCode()
                return false;
            }
            setToken(res.data.token)
            history.push("/agent/dashboard")
        }).catch(err => {
            console.log("gg", err)
        })
    }

    const handleForgetPwd = () => {
        history.push("/user/forgetpwd")
    }

    // 这里还不是很理解，在写
    const refreshVerifyCode = () => {
        let client_id = uuid();
        setClientID(client_id)
        setImgSrc(base_url + "/api/login/yzm?guid=" + client_id)
    }
    return (
        <div className='login-bg'>
            <div className="wraper-box"></div>
            <div className="header-wraper">
                <div className="header">
                    <img src="/assets/logo.png" className="my-logo" alt="logo" />
                    <div className="myuser">
                        <div className="myuserid">
                            <img className="myuseridnm" alt="" src="/assets/userImageIdsm1.png" />
                            <span className="myuseridonnm">Language<i className="ibn"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-tent">
                <h1 className="logintent-tle">欢迎登录代理商学习平台</h1>
                <Form>
                    <input className="login-btn btn-imlbg" type="text" placeholder="请输入您的邮箱" onChange={e => { setUserName(e.target.value) }} value={userName}/>
                    <input type="password" className="login-btn btn-psdbg" placeholder="请输入您的密码" onChange={e => { setPassword(e.target.value) }} value={password} />
                    <input className="login-btn btn-vfn" type="text" placeholder="请输入右侧验证码" onChange={e => { setVerifyCode(e.target.value) }} />
                    <img className="btn-vfnimg" alt="验证码" src={imgsrc} onClick={() => { refreshVerifyCode() }} style={{cursor:"pointer"}}/>
                    <button className="btn-on" onClick={handleLogin}>立即登录</button>
                    <p className="fgt-psd"><span style={{ cursor: "pointer" }} onClick={handleForgetPwd}>忘记密码？</span></p>
                </Form>

            </div>
        </div>
    )
}

export default Login