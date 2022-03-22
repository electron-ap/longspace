import React from 'react'
import { Checkbox, Row, Col } from 'antd';

function MultiImg() {
	function onChange(checkedValues) {
		console.log('checked = ', checkedValues);
	}
	return (
		<div className="singlechoice-box">
			<div className="group-duo group-duopc">
				<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
					<Row>
						<Col span={8}>
							<Checkbox value="A"><span className="duo-span">A：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
						</Col>
						<Col span={8}>
							<Checkbox value="B"><span className="duo-span">B：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
						</Col>
						<Col span={8}>
							<Checkbox value="C"><span className="duo-span">C：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
						</Col>
						<Col span={8}>
							<Checkbox value="D"><span className="duo-span">D：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
						</Col>
					</Row>
				</Checkbox.Group>
			</div>
		</div>
	)
}

export default MultiImg