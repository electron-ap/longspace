import React from 'react'
import { Form } from 'antd';
import { withRouter, Redirect, useHistory } from 'react-router-dom';
import './login.scss'

function ForgetPwd() {
    const history = useHistory();
    const handleLogin = () => {
        history.push("/")
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
                <h1 className="logintent-tle">忘记密码</h1>
                <Form>
                    <input className="login-btn btn-imlbg" type="text" placeholder="请输入您的邮箱" />
                    <input className="login-btn btn-iml-vfn" type="text" placeholder="请输入邮箱验证码" />
                    <button className="login-btn btn-iml-vfn-enter" >发送验证码</button>
                    <input className="login-btn btn-psdbg" type="text" placeholder="请输入您的密码" />
                    <input className="login-btn btn-psdbg" type="text" placeholder="请输入您的密码" />
                    <button className="btn-on" >确认修改</button>
                    <p className="fgt-psd fgt-color-blk"><span onClick={handleLogin}>返回登录</span></p>
                </Form>
                
            </div>
        </div>
    )
}

export default ForgetPwd