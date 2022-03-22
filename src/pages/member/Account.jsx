import React, { useEffect, useState } from 'react'
import { Input, Button, message } from 'antd';
import { userInfo, userSave, userModifyPwd } from "../../libs/api"
import "./index.scss"
function Account(props) {
	const { memberInfo } = props;
	const [position, setPosition] = useState(memberInfo.setPosition)
	const [name, setName] = useState(memberInfo.name)
	console.log("memberInfo.name", memberInfo.name)

	const handleSubmit = () => {
		console.log("position",position)
		userSave({ position:position===undefined?memberInfo.position:position, name:name===undefined?memberInfo.name:name }).then(res => {
			message.info(res.msg)
		}).catch(err => {

		})
	}

	return (
		<div className="act-iftion">
			<Input className="act-inputOne" addonBefore="账号" key={memberInfo.account} value={memberInfo.account} disabled />
			<Input className="act-inputOne" addonBefore="公司" key={memberInfo.company} value={memberInfo.company} disabled />
			<Input className="act-inputOne" addonBefore="职位" key={memberInfo.position} defaultValue={memberInfo.position} onChange={e => { setPosition(e.target.value) }} />
			<Input className="act-inputOne" addonBefore="姓名" key={memberInfo.name} defaultValue={memberInfo.name} onChange={e => { setName(e.target.value) }} />
			<Input className="act-inputOne" addonBefore="邮箱" key={memberInfo.email} value={memberInfo.email} disabled />
			<div className="act-password">密码<span className="password-modify">点击修改</span></div>
			<button className="act-preservation-save" type="button" onClick={handleSubmit}>保存</button>
		</div>
	)
}

export default Account