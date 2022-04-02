import React from 'react'
import { Checkbox } from 'antd';

function Multi(props) {
	const {item} = props
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
				<Checkbox.Group options={plainOptions} onChange={onChange} />
			</div>
		</div>
	)
}

export default Multi