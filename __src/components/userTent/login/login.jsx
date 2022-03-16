import logo from "../../../assets/logo.png"
import React from "react";
import { Form } from 'antd';
import './login.css'

const Login = () => {

    return (
        <>
            <div className="wraper-box"></div>
            <div className="header-wraper">
                <div className="header">
                    <img src={logo} className="my-logo" alt="logo" />  
                    <div className="myuser">
                        <div className="myuserid">
                            <img className="myuseridnm" alt="用户头像2" src={require("../../../assets/userImageIdsm1.png")} />
                            <span className="myuseridonnm">Language<i className="ibn"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-tent">
                <h1 className="logintent-tle">欢迎登录代理商学习平台</h1>
                <Form>
                    <input className="btn btn-imlbg" type="text" placeholder="请输入您的邮箱" />
                    <input className="btn btn-psdbg" type="text" placeholder="请输入您的密码" />
                    <input className="btn btn-vfn" type="text" placeholder="请输入右侧验证码" />
                    <img className="btn-vfnimg" alt="验证码" src={require("../../../assets/user/vfn.png")} />
                    <button className="btn-on" >立即登录</button>
                    <p className="fgt-psd"><span>忘记密码？</span></p>
                </Form>
                
            </div>
        </>
    )
}

export default Login