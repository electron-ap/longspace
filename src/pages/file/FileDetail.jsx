import React, { useEffect,useState} from 'react'
import { message } from 'antd';

function FileDetail(props) {
	console.log(props)
	let search = props.location.search;
	const paramsString = search.substring(1)
	const paramsArr = paramsString.split("&")
	console.log(paramsArr)
	let typeArr = paramsArr[0].split("=")
	let urlArr = paramsArr[1].split("=")
	console.log("aaaa:",typeArr[1])
	let url = urlArr[1]+"="+urlArr[2]
	let imgFlag = true;
	if (["MP4", "PDF"].includes(typeArr[1])){
		imgFlag =false
	}
	return (
		<div className='file-detail-box' style={{textAlign:"center"}}>
			{
				imgFlag?<img src={url} alt="" />:<embed src={url} type="application/pdf" width="100%" style={{ height: "100vh" }}></embed>
			}
			
			{/* <video ref={vedioRef} controls={vedioControls} src={detail.url}  height="500">
                您的浏览器不支持 video 标签。
            </video> */}
		</div>
	)
}

export default FileDetail