import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom';
// import ReactPlayer from 'react-player'
import { message } from 'antd';

import { courseDetail, startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import "../index.scss"

function Detail(props) {
    console.log("Detail", props)
    const vedioRef = useRef(null)
    const [detail, setDetail] = useState({});
    const [vedioControls, setVedioControls] = useState("");
    const [needStudyTime, setNeedStudyTime] = useState(0);
	const [studyedTime, setStudyedTime] = useState(0);
    const [timerID, setTimerID] = useState(null);

    useEffect(() => {
        courseDetail({ user_course_id: props.match.params.id }).then(res => {
            if (res.code === 200) {
                setDetail(res.data)
                setNeedStudyTime(res.data.min_long)
            } else {
                message.error(res.msg)
            }
        }).catch(err => { })
    }, [])

    const studyState = (state) => {
        let states = ['未学习', '学习中', '已完成', '考试']
        return states[state - 1]
    }

    const handleStart = () => {
        if (detail.type === "MP4") {
            setStudyedTime(studyedTime + 1)
            setVedioControls("controls")
            vedioRef.current.play();
        } else {
            window.open("/courseDetailPdf/"+props.match.params.id, "_blank")
        }
    }
    useEffect(() => {
		const countUp = () => {
			if (studyedTime <= needStudyTime*2 && studyedTime > 0) {
				if(studyedTime % 30 === 0){
					submitStudyTime(); //每30秒提交一次
				}
				let _timeID = setTimeout(() => {
					setStudyedTime(studyedTime + 1)
				}, 1000);
				setTimerID(_timeID)
			} else {
				clearTimeout(timerID)
			}
		}
		countUp()
	}, [studyedTime]);
    const submitStudyTime = () => {
        startCourse({ course_id: detail.course_id, page: 1, look_time: 59 }).then(res => {

        }).catch(err => {

        })
    }

    const renderTarget = () => {
        if (detail.type === "MP4") {
            return (<div className="csetent-box-show"><video ref={vedioRef} controls={vedioControls} src={detail.url}  height="500">
                您的浏览器不支持 video 标签。
            </video></div>)
        } else {
            return (<div className="csetent-box-show">
                <div className='pdf-box-mask'></div>
                <embed src={detail.url} type="application/pdf" width="100%" height="500"></embed></div>)
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
                    <div className="start-study" onClick={()=>handleStart()}>开始学习<span className="start-ibn"></span></div>
                </div>
                <div className="course-tent-right">
                    <div className="course-tent-tle">
                        <h1>{detail.title}</h1>
                        <p>{detail.introduce}</p>
                    </div>
                    <div className="course-tent-box">
                        <div className="csetent-box-tle">{studyedTime}最短学习时间：<span>{formatSeconds(detail.min_long)}</span></div>
                    
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