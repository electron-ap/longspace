import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'
import { message } from 'antd';

import { courseDetail, startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import "../index.scss"

function Detail(props) {
    
    const [detail, setDetail] = useState({});
    const vedioRef = useRef(null)

    useEffect(() => {
        courseDetail({ user_course_id: props.match.params.id }).then(res => {
            if (res.code === 200) {
                setDetail(res.data)
            } else {
                props.history.go(-1)
                message.error(res.msg)
            }
        }).catch(err => { })
    }, [])

    const studyState = (state) => {
        let states = ['未学习', '学习中', '已完成', '考试']
        return states[state - 1]
    }

    const renderTarget = () => {
        if (detail.type === "MP4") {
            return (<div className="csetent-box-show"><video ref={vedioRef} controls={false} src={detail.url} style={{maxWidth:"100%"}}>
                您的浏览器不支持 video 标签。
            </video></div>)
        } else {
            return (<div className="csetent-box-show">
                <div className='pdf-box-mask'></div>
                <embed src={detail.url} type="application/pdf"  style={{maxWidth:"100%",}} height="500"></embed></div>)
        }
    }
    return (
        <div className="course-box">
            <div className="course-title">
                <div className="course-tle-left">当前位置：<span><Link to="/agent/dashboard">首页</Link></span> - <span>Sales Partner Academy</span></div>
                <div className="course-tle-right">状态：<span>{studyState(detail.learning_state)}</span></div>
            </div>
            <div className="course-tent">
                <div className="course-tent-left">
                    <div className="list-box">
                        <img className="list-img" src={detail.cover} alt="" />
                        <span className="list-pdf">{detail.type}</span>
                    </div>
                    <div className="start-study"><Link to={`/CourseDetailFile/${props.match.params.id}`} target="_blank" style={{color:"#fff"}}>开始学习<span className="start-ibn"></span>
                </Link></div>
                </div>
                <div className="course-tent-right">
                    <div className="course-tent-tle">
                        <h1>{detail.title}</h1>
                        <p>{detail.introduce}</p>
                    </div>
                    <div className="course-tent-box">
                        <div className="csetent-box-tle">最短学习时间：<span>{formatSeconds(detail.min_long)}</span></div>
                    
                            {
                                renderTarget()
                            }
                        <div className="csetent-box-back"><span className="csetent-back" onClick={() => {
                            props.history.go(-1)
                        }}>返回上级</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail