import React, { useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { message } from 'antd';

import { courseDetail } from "../../../libs/api"
import "../index.scss"

function Detail(props) {
    console.log("Detail",props)
    // 定义函数初始状态detail，方法 setDetail  默认值为空对象{}
    const [detail,setDetail] = useState({});
    //useEffect方法 处理事件
    useEffect(() => {
        // 对事件的异步处理 
        courseDetail({user_course_id:props.match.params.id}).then(res => {
            if (res.code === 200) {
                setDetail(res.data)
            }else{
                message.error(res.msg)
            }
        }).catch(err => { })
    }, [])
    return (
        <div className="course-box">
            <div className="course-title">
                <div className="course-tle-left">当前位置：<span>首页</span> - <span>Sales Partner Academy</span></div>
                <div className="course-tle-right">状态：<span>未学习</span></div>
            </div>
            <div className="course-tent">
                <div className="course-tent-left">
                    <div className="list-box">
                        <img className="list-img" src={detail.cover} alt="" />
                        <span className="list-pdf">{detail.type}</span>
                    </div>
                    <div className="start-study">开始学习<span className="start-ibn"></span></div>
                </div>
                <div className="course-tent-right">
                    <div className="course-tent-tle">
                        <h1>{detail.title}</h1>
                        <p>{detail.introduce}</p>
                    </div>
                    <div className="course-tent-box">
                        <div className="csetent-box-tle">最短学习时间：<span>{parseInt(detail.min_long/60)}min</span></div>
                        <div className="csetent-box-show">
                            <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                        </div>
                        <div className="csetent-box-back"><span className="csetent-back" onClick={()=>{
                            props.history.go(-1)
                        }}>返回上级</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail