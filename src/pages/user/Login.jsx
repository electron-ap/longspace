import React, { useState, useEffect } from 'react'
import { Form, message} from 'antd';
import { useHistory } from 'react-router-dom';
import './login.scss'
import { login, base_url } from "../../libs/api"
import { uuid } from "../../libs/utils/function"
import { setToken } from "../../middleware/auth"
import { useLangContext } from '../../libs/utils/context'
import Header from './Header';
function Login() {
    let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

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
            message.error(langConfig.login_email_text);
            return false;
        }
        if (password === "") {
            message.error(langConfig.login_pwd_text);
            return false;
        }
        if (verifyCode === "") {
            message.error(langConfig.login_yzm_text);
            return false;
        }
        login({ email: userName,password: password, yzm: verifyCode,guid:clientID }).then(res => {
            if (res.code !== 200) {
                message.error(res.msg)
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

    const refreshVerifyCode = () => {
        let client_id = uuid();
        setClientID(client_id)
        setImgSrc(base_url + "/api/login/yzm?guid=" + client_id)
    }

    return (
        <div className='login-bg'>
            <div className="wraper-box"></div>
            <Header></Header>
            <div className="login-tent">
                <h1 className="logintent-tle">{langConfig.sys_title}</h1>
                <Form>
                    <input className="login-btn btn-imlbg" type="text" placeholder={langConfig.login_email_text} onChange={e => { setUserName(e.target.value) }} value={userName}/>
                    <input type="password" className="login-btn btn-psdbg" placeholder={langConfig.login_pwd_text} onChange={e => { setPassword(e.target.value) }} value={password} />
                    <input className="login-btn btn-vfn" type="text" placeholder={langConfig.login_yzm_text} onChange={e => { setVerifyCode(e.target.value) }} />
                    <img className="btn-vfnimg" alt="" src={imgsrc} onClick={() => { refreshVerifyCode() }} style={{cursor:"pointer"}}/>
                    <button className="btn-on" onClick={handleLogin}>{langConfig.login_btn_text}</button>
                    <p className="fgt-psd"><span style={{ cursor: "pointer" }} onClick={handleForgetPwd}>{langConfig.forget_pwd}？</span></p>
                </Form>

            </div>
        </div>
    )
}

export default Login