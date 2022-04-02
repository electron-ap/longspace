import React, { useState, useEffect } from 'react'
import { Select } from 'antd';
// import { useHistory } from 'react-router-dom';
import './login.scss'
import { useLangContext } from '../../libs/utils/context'
const { Option } = Select;

function Header() {
    let _language = localStorage.getItem('language') || 'zh-cn';
    const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

    return (
        <div className="header-wraper">
            <div className="header">
                <img src="/assets/logo.png" className="my-logo" alt="logo" />
                <div className="myuser">
                    <div className="language-lect">
                        <Select onChange={(e) => changeLang(e)} value={lang} dropdownMatchSelectWidth={false} >
                            <Option value="zh-cn"><span className="lg-zh">中 文</span></Option>
                            <Option value="en-us"><span className="lg-en">English</span></Option>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header