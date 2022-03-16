import logo from "../../../assets/logo.png"
import React from "react";
import { Form } from 'antd';
import './login.css'

const FgtPswd = () => {

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
                <h1 className="logintent-tle">忘记密码</h1>
                <Form>
                    <input className="btn btn-imlbg" type="text" placeholder="请输入您的邮箱" />
                    <input className="btn btn-iml-vfn" type="text" placeholder="请输入邮箱验证码" />
                    <button className="btn-iml-vfn-enter" >发送验证码</button>
                    <input className="btn btn-psdbg" type="text" placeholder="请输入您的密码" />
                    <input className="btn btn-psdbg" type="text" placeholder="请输入您的密码" />
                    <button className="btn-on" >确认修改</button>
                    <p className="fgt-psd fgt-color-blk"><span>返回登录</span></p>
                </Form>
                
            </div>
        </>
    )
}

export default FgtPswd