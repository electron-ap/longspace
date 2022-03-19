import React, { useState } from 'react'
import { NavLink,Link } from 'react-router-dom'
import "./index.scss"

function Academy(props) {
    console.log("props", props)
    const [tabList, setTabList] = useState([
        { title: '课程', count: 10, path: "/agent/academy/CourseList" },
        { title: '学习中', count: 10, path: "/agent/academy/StudyList" },
        { title: '已完成', count: 10, path: "/agent/academy/Finished" },
        { title: '考试', count: 10, path: "/agent/academy/ExamList" },
        { title: '证书', count: 10, path: "/agent/academy/CertList" },
    ]);

    return (
        <div>
            <div style={{
                width: '100%',
                height: '240px',
                background: "url(/assets/cs-banner.png) no-repeat center center fixed",
                backgroundSize: 'cover',
            }} className="coursed-banner">
                <div className="coursed-tent">
                    <div className="coursed-tle">Sales Partner Academy</div>
                    <div className="coursed-rln">当前位置：<span className="coursed-index"> <Link to="/agent/dashboard">首页</Link></span> - <span>Sales Partner Academy</span></div>
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