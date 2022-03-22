import React, { useEffect, useState } from 'react'
import "./index.scss"
import { message } from 'antd';
import Single from './components/Single';
import Multi from './components/Multi';
import MultiImg from './components/MultiImg';
import ShowCheck from './components/ShowCheck';
import Result from './components/Result';
import { examEnter,examPreNext,examSubmit,examProgress,examResult } from "../../../libs/api"

function Test(props) {
    console.log("props.match.params.topic",props.match.params.topic)
    let topic = props.match.params.topic
    const [paperInfo, setPaperInfo] = useState({})
    const [question, setQuestion] = useState({})
	useEffect(() => {
		getPaperInfo()
	}, [])

    // 获取试卷信息
	const getPaperInfo = () => {
		examEnter({ topic}).then(res => {
			if (res.code === 200) {
				setPaperInfo(res.data)
			}
		}).catch(err => { })
	}

    // 获取下一题
    const getQuestion = () => {
		examPreNext({ topic}).then(res => {
			if (res.code === 200) {
				setQuestion(res.data)
			}
		}).catch(err => { })
	}

    // 提交试卷
    const submitPaper = () => {
		examSubmit({ topic}).then(res => {
			if (res.code === 200) {
				
			}
		}).catch(err => { })
	}

    return (
        <div className="course-all">
            {/* 考试单选题 */}
            <div className="exam-title">
                <div className="exam-title-left">考试进度11(<span>3/25</span>)</div>
                <div className="exam-title-right">
                    <span className="coun-down">倒计时 03:50</span>
                </div>
            </div>
            <div className="option-questions-tle">
                <span>3.</span>
                <span className="single-choice">【单选题】</span>
                <span>3D打印机的操作分为几个步骤？（3分）</span>
            </div>
            
            
            <Single></Single>
            <Multi></Multi>
            <MultiImg></MultiImg>

            <button className="singlechoice-skip">跳过</button>
            <button className="singlechoice-sign">标记</button>


            <ShowCheck></ShowCheck>
            <Result></Result>

            <button className="singlechoice-submit">确定11</button>

        </div>
    )
}

export default Test