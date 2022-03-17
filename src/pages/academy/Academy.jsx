import React, { useState } from 'react'
import "./index.scss"
import Course from './Course/Course'
import Cert from "./Cert/Cert"
import Finished from "./Finished/Finished"
import Study from "./Study/Study"
import Exam from "./Exam/Exam"

function Academy() {
    const [tabList, setTabList] = useState([
        { title: '课程', count: 10 },
        { title: '学习中', count: 10 },
        { title: '已完成', count: 10 },
        { title: '考试', count: 10 },
        { title: '证书', count: 10 },
    ]);
    const [tabActive, setTabActive] = useState(0);

    const handleTabChange = (index) =>{
        setTabActive(index)
        console.log(index)
    }

    const renderTabCom = () =>{
        if(tabActive === 0){
            return <Course />
        }else if(tabActive === 1){
            return <Study />
        }else if(tabActive === 2){
            return <Finished />
        }else if(tabActive === 3){
            return <Exam />
        }else if(tabActive === 4){
            return <Cert />
        }
    }

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
                    <div className="coursed-rln">当前位置：<span className="coursed-index">首页</span> - <span>Sales Partner Academy</span></div>
                </div>
            </div>

            <div className="course-column">
                <ul className="course-column-ul">
                    {
                        tabList.map((item, index) => {
                            return <li className={index === tabActive?'column-ulli columnactive':'column-ulli'} onClick={()=>handleTabChange(index)} key={index}>
                                <span>{item.count}</span>
                                <p>{item.title}</p>
                            </li>
                        })
                    }
                </ul>
            </div>
            
            {renderTabCom()}
        </div>
    )
}

export default Academy