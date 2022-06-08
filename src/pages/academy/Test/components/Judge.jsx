import React from 'react'
import { Radio } from 'antd';

function  Judge(props) {
	console.log("Judge(props) ",props)
	const {item} = props
	let answer = JSON.parse(item.answer)
	function onChange(e) {
		props.handlepaperitem(e.target.value)
	}
	return (
		<div className="singlechoice-box">
			<div className="group-dan">
				<Radio.Group onChange={onChange}  defaultValue={answer[0]}>
					<Radio.Button value="e">正确</Radio.Button>
					<Radio.Button value="f">错误</Radio.Button>
					{/* ：{item.option_b} */}
				</Radio.Group>
			</div>
		</div>
	)
}

export default Judge