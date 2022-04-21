import React from 'react'
import { Checkbox } from 'antd';
//Multi函数组件
function Multi() {
	const plainOptions = ['A：3个步骤', 'B：4个步骤', 'C：5个步骤', 'D：6个步骤'];
	//onChange函数事件 输出'checked = ', checkedValues
	function onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}
	return (
		<div className="singlechoice-box">
			<div className="group-duo">
				<Checkbox.Group options={plainOptions} defaultValue={['A：3个步骤']} onChange={onChange} />
			</div>
		</div>
	)
}

export default Multi