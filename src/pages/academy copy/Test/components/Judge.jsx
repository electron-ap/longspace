import React from 'react'
import { Radio } from 'antd';

function  Judge(props) {
	const {item} = props
	function onChange(e) {
		props.handlepaperitem(e.target.value)
	}
	return (
		<div className="singlechoice-box">
			<div className="group-dan">
				<Radio.Group onChange={onChange} >
					<Radio.Button value="e">E：{item.option_a}</Radio.Button>
					<Radio.Button value="f">F：{item.option_b}</Radio.Button>
				</Radio.Group>
			</div>
		</div>
	)
}

export default Judge