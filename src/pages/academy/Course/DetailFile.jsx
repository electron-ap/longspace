import React, { useEffect, useState } from 'react'
import { message } from 'antd';
import { courseDetail, startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import "../index.scss"

function DetailFile(props) {
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
	const renderTarget = () => {
        if (detail.type === "MP4") {
            return (<div style={{height:"100%",textAlign:"center"}}><video autoplay controls={true} src={detail.url}  height="100%">
			您的浏览器不支持 video 标签。
		</video></div>)
        }else if (["PNG", 'JPG', 'JPEG', 'GIF'].includes(detail.type)) {
			return (<div style={{height:"100%"}}>
                <div className='pdf-box-mask'></div>
                <img src={detail.url} alt="" />
				</div>)
		} else {
            return (<div style={{height:"100%"}}>
                <div className='pdf-box-mask'></div>
                <embed src={detail.url} type="application/pdf" width="100%" height="100%"></embed></div>)
        }
    }

	return (
		<div className='pdf-box'>
			<div className='timer-box'>{formatSeconds(studyedTime)}</div>
			{
				renderTarget()
			}
		</div>
	)
}

export default DetailFile