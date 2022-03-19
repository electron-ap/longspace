import React from 'react'
import { Radio } from 'antd';

function Single() {
	function onChange(e) {
		console.log(`radio checked:${e.target.value}`);
	}
	return (
		<div className="singlechoice-box">
			<div className="group-dan">
				<Radio.Group onChange={onChange} defaultValue="a">
					<Radio.Button value="a">A：3个步骤</Radio.Button>
					<Radio.Button value="b">B：4个步骤</Radio.Button>
					<Radio.Button value="c">C：5个步骤</Radio.Button>
					<Radio.Button value="d">D：6个步骤</Radio.Button>
				</Radio.Group>
			</div>
		</div>
	)
}

export default Single