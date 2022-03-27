import React, { useEffect, useState, useRef } from 'react'
import { useHistory, Link } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { message } from 'antd';

import { courseDetail,startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import "../index.scss"
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

function Detail(props) {
    console.log("Detail", props)
    const vedioRef = useRef(null)
    const [detail, setDetail] = useState({});
    const [vedioControls, setVedioControls] = useState("");
    useEffect(() => {
        courseDetail({ user_course_id: props.match.params.id }).then(res => {
            if (res.code === 200) {
                setDetail(res.data)
            } else {
                message.error(res.msg)
            }
        }).catch(err => { })
    }, [])

    const studyState = (state) => {
        let states = ['未学习', '学习中', '已完成', '考试']
        return states[state]
    }

    const handleStart = () => {
        // if(detail.type=== "MP4"){
        //     vedioRef.current.play();
        // }
        setVedioControls("controls")
        vedioRef.current.play();
    }

    const submitStartTime = () =>{
        startCourse({}).then(res=>{

        }).catch(err=>{

        })
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
                    <div className="start-study" onClick={handleStart}>开始学习<span className="start-ibn"></span></div>
                </div>
                <div className="course-tent-right">
                    <div className="course-tent-tle">
                        <h1>{detail.title}</h1>
                        <p>{detail.introduce}</p>
                    </div>
                    <div className="course-tent-box">
                        <div className="csetent-box-tle">最短学习时间：<span>{formatSeconds(detail.min_long)}</span></div>
                        <div className="csetent-box-show">
                            {/* <img className="list-img" src="/assets/screen/listimg01.png" alt="" /> */}
                            {/* <iframe src='http://fuzhi.forwap.cn/api/file/index.html?file=gM1BPM3Bx61633Ot&scene=1'></iframe> */}

                            <embed src="http://fuzhi.forwap.cn/static/c.pdf" type="application/pdf" width="100%" height="500"></embed>
                            <Document
//文件路径,/assets/c.pdf
 file="http://fuzhi.forwap.cn/static/c.pdf"
//加载成功调用 
onLoadSuccess={()=>{}} 
//加载失败调用 
onLoadError={()=>{}} 
//加载提示 
  loading={<div>Please wait!</div>}> 
  <Page pageNumber={1} /> 
</Document>

                            {/* <ReactPlayer url={detail.url} /> */}
                            <video ref={vedioRef} controls={vedioControls}  src="http://fuzhi.forwap.cn/api/file/index.html?file=gM1BPM3Bx61633Ot&scene=1" >
                                您的浏览器不支持 video 标签。
                            </video>
                        </div>
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