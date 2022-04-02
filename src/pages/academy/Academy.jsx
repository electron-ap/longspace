import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import "./index.scss"
import { courseCalc,memberDetail } from "../../libs/api"
import { useLangContext } from '../../libs/utils/context'

function Academy(props) {
    let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

    const [userId, setUserId] = useState("");
    const [userName, setUserName] = useState("");
    let _path = props.location.pathname
    let _path_arr = _path.split("/");
    let last_val = _path_arr[_path_arr.length-1];
    if(/^[0-9]*[1-9][0-9]*$/.test(last_val)){
        // 授权学员课程
    }else{
        last_val = ""
    }
    const [tabList, setTabList] = useState([]);

    useEffect(() => {
        
        if(last_val !== ""){
            // 授权学员课程
            memberDetail({user_id:last_val}).then(res => {
                if (res.code === 200) {
                    const {total,study,complete,test,certificate,name} = res.data
                    setTabList([
                        { title: langConfig.c_course, count: total, path: "/agent/academy/CourseList/"+last_val },
                        { title: langConfig.c_study, count: study, path: "/agent/academy/StudyList/"+last_val },
                        { title: langConfig.c_complete, count: complete, path: "/agent/academy/Finished/"+last_val },
                        { title: langConfig.c_test, count: test, path: "/agent/academy/ExamList/"+last_val },
                        { title: langConfig.c_cert, count: certificate, path: "/agent/academy/CertList/"+last_val },
                    ])
                    setUserName(name);
                }
            }).catch(err => { })
        }else{
            courseCalc().then(res => {
                if (res.code === 200) {
                    const {total,study,complete,test,certificate} = res.data
                    setTabList([
                        { title: langConfig.c_course, count: total, path: "/agent/academy/CourseList/"+last_val },
                        { title: langConfig.c_study, count: study, path: "/agent/academy/StudyList/"+last_val },
                        { title: langConfig.c_complete, count: complete, path: "/agent/academy/Finished/"+last_val },
                        { title: langConfig.c_test, count: test, path: "/agent/academy/ExamList/"+last_val },
                        { title: langConfig.c_cert, count: certificate, path: "/agent/academy/CertList/"+last_val },
                    ])
                }
            }).catch(err => { })
        }
    }, [])

    return (
        <div>
            <div style={{
                width: '100%',
                height: '240px',
                background: "url(/assets/cs-banner.png) no-repeat center center fixed",
                backgroundSize: 'cover',
            }} className="coursed-banner">
                <div className="coursed-tent">
                    <div className="coursed-tle">{userName===""?"Sales Partner Academy":`${langConfig.staff}：${userName}`}</div>
                    <div className="coursed-rln">{langConfig.postion}：<span className="coursed-index"> <Link to="/agent/dashboard" className='a-white'>{langConfig.home}</Link></span> - <span>Sales Partner Academy</span></div>
                </div>
            </div>

            <div className="course-column">
                <ul className="course-column-ul">
                    {
                        tabList.map((item, index) => {
                            return <NavLink to={item.path} activeClassName="columnactive" className='column-ulli' key={index}>
                                <span>{item.count}</span>
                                <p>{item.title}</p>
                            </NavLink>
                        })
                    }
                </ul>
            </div>

            {/* {renderTabCom()} */
                props.children
            }
        </div>
    )
}

export default Academy