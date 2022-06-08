import React, { useEffect, useRef } from 'react'
import { message } from 'antd';

function FileDetail(props) {
	const vedioRef = useRef(null)
	let search = props.location.search;
	const paramsString = search.substring(1)
	const paramsArr = paramsString.split("&")
	let typeArr = paramsArr[0].split("=")
	let urlArr = paramsArr[1].split("=")
	let url = urlArr[1] + "=" + urlArr[2]

	useEffect(() => {
		if (["MP4"].includes(typeArr[1])) {
			setTimeout(() => {
				vedioRef.current.play();
			}, 200)
		}
	}, [])
	const renderTar = () => {
		if (["MP4"].includes(typeArr[1])) {
			// muted
			return (<video controls="controls" src={url} ref={vedioRef} autoplay="autoplay" preload style={{ height: "100vh" }}>
				您的浏览器不支持 video 标签。
			</video>)
		} else if (["PDF"].includes(typeArr[1])) {
			return <embed src={url} type="application/pdf" width="100%" style={{ height: "100%" }}></embed>
		} else {
			return <div style={{ display:"flex",background: "#000000",alignItems:"center",height:"100%",justifyContent:"center"}}><img src={url} alt="" style={{width:"auto",maxWidth:"100%",height:"auto",maxHeight:"100%"}} /></div>
		}
	}
	return (
		<div className='file-detail-box' style={{ textAlign: "center",
		height: "100%",
		lineHeight:  "100%",overflowY:"scroll" }}>
			{renderTar()}
		</div>
	)
}

export default FileDetail