import React, { useEffect, useState, useRef, useMemo } from 'react'
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'
import { message } from 'antd';

import { courseDetail, startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import { useLangContext } from '../../../libs/utils/context'
import "../index.scss"

function Detail(props) {
    let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

    const [detail, setDetail] = useState({});
    const vedioRef = useRef(null)

    useEffect(() => {
        courseDetail({ course_id: props.match.params.id }).then(res => {
            if (res.code === 200) {
                setDetail(res.data)
            } else {
                props.history.go(-1)
                message.error(res.msg)
            }
        }).catch(err => { })
    }, [])

    const studyState = (state) => {
        let states = [langConfig.c_status_progress_no, langConfig.c_status_progressing, langConfig.c_status_completed, langConfig.c_status_test]
        
        return states[state - 1]
    }

    const renderTarget = useMemo(() => {

        if (detail.type === "MP4") {
            return (<div className="csetent-box-show">
                <video ref={vedioRef} controls={false} src={detail.url} style={{ maxWidth: "100%", height:"520px" }}>
                您的浏览器不支持 video 标签。
            </video>
            </div>)
        } else if (["PNG", 'JPG', 'JPEG', 'GIF'].includes(detail.type)) {
            return (<div className="csetent-box-show"><img src={detail.url} alt="" /></div>)
        } else {
            return (<div className="csetent-box-show">
                <div className='pdf-box-mask'></div>
                <embed src={detail.url} type="application/pdf" style={{ maxWidth: "100%", }} height="500"></embed></div>)
        }
    }, [detail]);

    return (
        <div className="course-box">
            <div className="course-title">
                <div className="course-tle-left">{langConfig.postion}：<span><Link to="/agent/dashboard">{langConfig.home}</Link></span> - <span>Sales Partner Academy</span></div>
                <div className="course-tle-right">{langConfig.c_status}：<span>{studyState(detail.learning_state)}</span></div>
            </div>
            <div className="course-tent">
                <div className="course-tent-left">
                    {/* <div className="list-box">
                        <img className="list-img" src={detail.cover} alt="" />
                        <span className="list-pdf">{detail.type}</span>
                    </div> */}
                    <div className="start-study"><Link to={`/CourseDetailFile/${props.match.params.id}`} target="_blank" style={{ color: "#fff" }}>{langConfig.start_learning}<span className="start-ibn"></span>
                    </Link></div>
                </div>
                <div className="course-tent-right">
                    <div className="course-tent-tle">
                        <h1>{detail.title}</h1>
                        <p>{detail.introduce}</p>
                    </div>
                    <div className="course-tent-box">
                        <div className="csetent-box-tle">{langConfig.min_learning_time}：<span>{formatSeconds(detail.min_long)}</span></div>

                        {
                            // renderTarget
                        }
                        <div className="csetent-box-back"><span className="csetent-back" onClick={() => {
                            props.history.go(-1)
                        }}>{langConfig.Return}</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail