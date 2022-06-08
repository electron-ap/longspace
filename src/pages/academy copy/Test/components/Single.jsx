import React from 'react'
import { Radio } from 'antd';

function  Single(props) {
	const {item} = props
	function onChange(e) {
		props.handlepaperitem(e.target.value)
	}
	return (
		<div className="singlechoice-box">
			<div className="group-dan">
				<Radio.Group onChange={onChange} >
					<Radio.Button value="a">【 A 】 {item.option_a}</Radio.Button>
					<Radio.Button value="b">【 B 】 {item.option_b}</Radio.Button>
					<Radio.Button value="c">【 C 】 {item.option_c}</Radio.Button>
					<Radio.Button value="d">【 D 】 {item.option_d}</Radio.Button>
				</Radio.Group>
			</div>
		</div>
	)
}

export default Single