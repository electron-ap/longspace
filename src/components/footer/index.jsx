import React, { useEffect, useState } from "react";

import { useLangContext } from '../../libs/utils/context'
import './index.css' 

const Myfooter = () => {
    let _language = localStorage.getItem('language') || 'zh-cn';
    const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])
    return (
        <>
            <div className="footer-wraper">
                <div className="footer">
                    {
                        lang==='zh-cn'?<>
                       ©2009-2022 上海复志信息技术有限公司 保留所有权利。沪公网安备 31011002003541号   沪ICP备12042035号-5
                        </>:<>
                        ©2022. All Rights Reserved. Raise 3D Technologies, Inc.
                        </>
                    }
                
                </div>
            </div>
        </>
    )
}

export default Myfooter