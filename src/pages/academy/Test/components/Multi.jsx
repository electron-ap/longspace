import React from 'react'
import { Checkbox } from 'antd';

function Multi(props) {
	console.log("Multi(props) ",props)
	const {item} = props
	let answer = JSON.parse(item.answer)
	const plainOptions = [
		{label:`A:${item.option_a}`,value:'a'},
		{label:`B:${item.option_b}`,value:'b'},
		{label:`C:${item.option_c}`,value:'c'},
		{label:`D:${item.option_d}`,value:'d'},
	];
	function onChange(checkedValues) {
		props.handlepaperitem(checkedValues)
	}
	return (
		<div className="singlechoice-box">
			<div className="group-duo">
				<Checkbox.Group options={plainOptions} onChange={onChange} defaultValue={answer} />
			</div>
		</div>
	)
}

export default Multi