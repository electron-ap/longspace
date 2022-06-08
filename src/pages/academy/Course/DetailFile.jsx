import React, { useEffect, useState, useRef } from 'react'
import { message } from 'antd';
import { courseDetail, startCourse } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"

import Player from 'xgplayer/dist/simple_player';
import volume from 'xgplayer/dist/controls/volume';
import playbackRate from 'xgplayer/dist/controls/playbackRate';
import "../index.scss"

function DetailFile(props) {
	// const [needStudyTime, setNeedStudyTime] = useState(0);
	const [studyedTime, setStudyedTime] = useState(0);
	const [timerID, setTimerID] = useState(null);
	const [vedioUrl, setVedioUrl] = useState('');

	const [detail, setDetail] = useState({});
	useEffect(() => {
		courseDetail({ course_id: props.match.params.id }).then(res => {
			if (res.code === 200) {
				setDetail(res.data)
				// setNeedStudyTime(res.data.min_long)
				if (res.data.type === "MP4" || res.data.type === null) {
					setVedioUrl(res.data.url)
				}
			} else {
				message.error(res.msg)
			}
		}).catch(err => { })

		return () => {
			setTimerID(null)
		}
	}, [])
	useEffect(() => {
		const player = new Player({
			autoplay: true,
			volume: 0.3,
			url:'http://fuzhi.forwap.cn/api/file/index.html?file=gM1BPM3Bx61633Ot&scene=1',
			playsinline: true,
			controlPlugins: [
				volume,
				playbackRate
			],
			playbackRate: [0.5, 0.75, 1, 1.5, 2], //传入倍速可选数组
			height: window.innerHeight,
			width: window.innerWidth,
			id: 'mse',
			// url: vedioUrl,
			// autoplay: true,
			// // volume: 0,
			// height: "100%",//window.innerHeight,
			// width: "100%",// window.innerWidth,
			// controlPlugins: [
			// 	volume,
			// 	playbackRate
			// ],
			// playbackRate: [0.5, 0.75, 1, 1.5, 2] //传入倍速可选数组
		});
		// player.once('complete', () => {
		// 	console.log('complete', player)

		// 	player.play()
		// 	// player.getFullscreen(player.root)
		// })

		// return () => {
		// 	player.once('destroy', () => { console.log('destroy') })
		// }
		//   player.play()
	}, [vedioUrl])


	useEffect(() => {
		const countUp = () => {
			if (studyedTime <= 7200) {
				if (studyedTime > 0 && studyedTime % 20 === 0) {
					submitStudyTime(); //每20秒提交一次
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
		startCourse({ course_id: props.match.params.id, look_time: studyedTime, page: 1 }).then(res => {

		}).catch(err => {

		})
	}
	const renderTarget = () => {
		if (detail.type === "MP4" || detail.type === null) {
			return (
				<>
					<div id="mse" style={{ height: "100vh", width: "100%", textAlign: "center" }}>
						{/* <video controls="controls" src={detail.url} ref={vedioRef} autoplay="autoplay" preload style={{ height: "100vh" }}>
				您的浏览器不支持 video 标签。
			</video> */}
					</div>
				</>
			)
		} else if (["PNG", 'JPG', 'JPEG', 'GIF'].includes(detail.type)) {
			return (<div style={{ height: "100%" }}>
				<div className='pdf-box-mask'></div>
				<img src={detail.url} alt="" style={{ width: "100%" }} />
			</div>)
		} else {
			return (<div style={{ height: "100%" }}>
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