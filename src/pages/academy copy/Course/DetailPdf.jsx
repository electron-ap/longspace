import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import { courseDetail, startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import "../index.scss"

function DetailPdf(props) {
	const [needStudyTime, setNeedStudyTime] = useState(0);
	const [studyedTime, setStudyedTime] = useState(0);
	const [timerID, setTimerID] = useState(null);

	const [detail, setDetail] = useState({});
	useEffect(() => {
		courseDetail({ user_course_id: props.match.params.id }).then(res => {
			if (res.code === 200) {
				setDetail(res.data)
				setNeedStudyTime(res.data.min_long)
			} else {
				message.error(res.msg)
			}
		}).catch(err => { })

		return () => {
			setTimerID(null)
		}
	}, [])

	useEffect(() => {
		setStudyedTime(studyedTime + 1)
	}, [needStudyTime]);

	useEffect(() => {
		const countUp = () => {
			if (studyedTime <= needStudyTime*2) {
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

	// 提交学习时间
	const submitStudyTime = () => {
        startCourse({course_id:props.match.params.id ,look_time:studyedTime,page:1}).then(res => {

        }).catch(err => {

        })
    }

	return (
		<div className='pdf-box'>
			<div className='timer-box'>{formatSeconds(studyedTime)}</div>
			<embed src={detail.url} type="application/pdf" width="100%" style={{ height: "100vh" }}></embed>
		</div>
	)
}

export default DetailPdf