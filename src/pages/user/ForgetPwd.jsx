import React, { useState,useEffect } from 'react'
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import './login.scss'
import { sendYzm, savePassword } from "../../libs/api"
import Header from './Header';
import { useLangContext } from '../../libs/utils/context'

function ForgetPwd() {
    let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])


    const history = useHistory();
    const handleLogin = () => {
        history.push("/")
    }
    const [email, setEmail] = useState('');
    const [yzm, setYzm] = useState('');
    const [password, setPassword] = useState('');
    const [again, setAgain] = useState('');

    const sendEmail = () => {
        if (email === "") {
            message.error(langConfig.login_email_text)
            return false
        }
        sendYzm({ email }).then(res => {
            if (res.code !== 200) {
                message.error(res.msg)
                return false;
            }
        }).catch(err => {
            console.log("gg", err)
        })
    }

    const handleSubmit = () => {
        savePassword({ email,yzm,password,again }).then(res => {
            if (res.code !== 200) {
                message.error(res.msg)
                return false;
            }
        }).catch(err => {
            console.log("gg", err)
        })
    }
    return (
        <div className='login-bg'>
            <div className="wraper-box"></div>
            <Header></Header>
            <div className="login-tent">
                <h1 className="logintent-tle">{langConfig.forget_pwd}</h1>
                <Form>
                    <input className="login-btn btn-imlbg" onChange={e => { setEmail(e.target.value) }} value={email} type="text" placeholder={langConfig.login_email_text} />
                    <input className="login-btn btn-iml-vfn" onChange={e => { setYzm(e.target.value) }} value={yzm} type="text" placeholder={langConfig.login_yzm_text} />
                    <button className="login-btn-iml-vfn-enter" style={{ background: "#1B1B1B", color: "#fff", height: '46px', width: "97px", marginLeft: "12px", border: "none", borderRadius: "3px" }} onClick={() => sendEmail()} >{langConfig.send_yzm}</button>
                    <input className="login-btn btn-psdbg" onChange={e => { setPassword(e.target.value) }} value={password} type="text" placeholder={langConfig.login_pwd_text} />
                    <input className="login-btn btn-psdbg" onChange={e => { setAgain(e.target.value) }} value={again} type="text" placeholder={langConfig.enter_pwd_again} />
                    <button className="btn-on" onClick={() => handleSubmit()} >{langConfig.confirm_modify}</button>
                    <p className="fgt-psd fgt-color-blk"><span onClick={handleLogin}>{langConfig.back_to_login}</span></p>
                </Form>

            </div>
        </div>
    )
}

export default ForgetPwd