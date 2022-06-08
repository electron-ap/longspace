import React, { useState, useEffect } from 'react'
import { Form, message } from 'antd';
import { useHistory } from 'react-router-dom';
import './login.scss'
import { sendYzm, savePassword } from "../../libs/api"
import Header from './Header';
import { useLangContext } from '../../libs/utils/context'

function ActiveAcc() {
    let _language = localStorage.getItem('language') || 'zh-cn';
    const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
        if (lang === 'zh-cn') {
            setlangBtnYzm("发送验证码")
        } else {
            setlangBtnYzm(`send code`)
        }
    }, [lang])


    const [langBtnYzm, setlangBtnYzm] = useState("")
    const [timerID, setTimerID] = useState(null);
    const [seconds, setSeconds] = useState(0);
    const countDown = () => {
        if (seconds > 0) {
            console.log(seconds, lang)
            let _timeID = setTimeout(() => {
                if (lang === 'zh-cn') {
                    setlangBtnYzm(seconds + "s后重发")
                } else {
                    setlangBtnYzm(`wait ${seconds} s`)
                }
                setSeconds(seconds - 1)
            }, 1000);
            setTimerID(_timeID)
        } else {
            if (lang === 'zh-cn') {
                setlangBtnYzm("发送验证码")
            } else {
                setlangBtnYzm(`send code`)
            }
            clearTimeout(timerID)
        }
    }
    useEffect(() => {
        countDown()
    }, [seconds]);

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
        if (seconds > 0) {
            return false;
        }
        setSeconds(60)
        sendYzm({ email }).then(res => {
            message.info(res.msg)
        }).catch(err => {
            console.log("gg", err)
        })
    }

    const handleSubmit = () => {
        savePassword({ email, yzm, password, again }).then(res => {
            if (res.code !== 204) {
                return false;
            }
            message.info(res.msg)
            history.push("/")
        }).catch(err => {
            console.log("gg", err)
        })
    }
    return (
        <div className='login-bg'>
            <div className="wraper-box"></div>
            <Header></Header>
            <div className="login-tent">
                <h1 className="logintent-tle">{langConfig.ac_title}</h1>
                <Form>
                    <input className="login-btn btn-imlbg" onChange={e => { setEmail(e.target.value) }} value={email} type="text" placeholder={langConfig.ac_field_email} />
                    <input className="login-btn btn-iml-vfn" onChange={e => { setYzm(e.target.value) }} value={yzm} type="text" placeholder={langConfig.ac_field_code} />
                    <button style={{ color: "#fff", height: '46px', width: "97px", marginLeft: "12px", border: "none", borderRadius: "3px" }} onClick={() => sendEmail()} className={seconds > 0 ? 'greybg' : "blackbg"} >{langBtnYzm}</button>
                    <input type="password" className="login-btn btn-psdbg" onChange={e => { setPassword(e.target.value) }} value={password} placeholder={langConfig.ac_field_pwd} />
                    <input className="login-btn btn-psdbg" onChange={e => { setAgain(e.target.value) }} value={again} type="password" placeholder={langConfig.ac_field_repwd} />
                    <button className="btn-on" onClick={() => handleSubmit()} >{langConfig.confirm_modify}</button>
                    <p className="fgt-psd fgt-color-blk"><span onClick={handleLogin}>{langConfig.back_to_login}</span></p>
                </Form>

            </div>
        </div>
    )
}

export default ActiveAcc