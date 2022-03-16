import React from 'react'
import { Form } from 'antd';
import { withRouter, Redirect, useHistory } from 'react-router-dom';
import './login.scss'

function Login() {
    const history = useHistory();
    const handleLogin = () =>{
        history.push("/agent/dashboard")
    }

    const handleForgetPwd = () => {
        history.push("/user/forgetpwd")
    }
    return (
        <div className='login-bg'>
            <div className="wraper-box"></div>
            <div className="header-wraper">
                <div className="header">
                    <img src="/assets/logo.png" className="my-logo" alt="logo" />
                    <div className="myuser">
                        <div className="myuserid">
                            <img className="myuseridnm" alt="用户头像2" src="/assets/userImageIdsm1.png" />
                            <span className="myuseridonnm">Language<i className="ibn"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-tent">
                <h1 className="logintent-tle">欢迎登录代理商学习平台</h1>
                <Form>
                    <input className="login-btn btn-imlbg" type="text" placeholder="请输入您的邮箱" />
                    <input className="login-btn btn-psdbg" type="text" placeholder="请输入您的密码" />
                    <input className="login-btn btn-vfn" type="text" placeholder="请输入右侧验证码" />
                    <img className="btn-vfnimg" alt="验证码" src="/assets/user/vfn.png" />
                    <button className="btn-on" onClick={handleLogin}>立即登录</button>
                    <p className="fgt-psd"><span style={{cursor:"pointer"}} onClick={handleForgetPwd}>忘记密码？</span></p>
                </Form>

            </div>
        </div>
    )
}

export default Login