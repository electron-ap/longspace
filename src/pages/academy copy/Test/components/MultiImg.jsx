import React from 'react'
import { Checkbox, Row, Col } from 'antd';

function MultiImg(props) {
	const {item} = props
	function onChange(checkedValues) {
		props.handlepaperitem(checkedValues)
	}
	return (
		<div className="singlechoice-box">
			<div className="group-duo group-duopc">
				<Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
					<Row>
						<Col span={8}>
							<Checkbox value="a"><span className="duo-span">A：{item.option_a}</span><img className="duo-img" alt="" src={item.option_a_img} /></Checkbox>
						</Col>
						<Col span={8}>
							<Checkbox value="b"><span className="duo-span">B：{item.option_b}</span><img className="duo-img" alt="" src={item.option_b_img} /></Checkbox>
						</Col>
						<Col span={8}>
							<Checkbox value="c"><span className="duo-span">C：{item.option_c}</span><img className="duo-img" alt="" src={item.option_c_img} /></Checkbox>
						</Col>
						<Col span={8}>
							<Checkbox value="d"><span className="duo-span">D：{item.option_d}</span><img className="duo-img" alt="" src={item.option_d_img} /></Checkbox>
						</Col>
					</Row>
				</Checkbox.Group>
			</div>
		</div>
	)
}

export default MultiImg