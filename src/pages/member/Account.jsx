import React, { useContext } from 'react'
import { Input, Button } from 'antd';
import "./index.scss"
function Account(props) {
	// const {lang,langPackage} = useContext(LangContext)
	console.log(props)
	return (
		<div className="act-iftion">
			<Input className="act-inputOne" addonBefore="账号" placeholder="RDL00001" disabled />
			<Input className="act-inputOne" addonBefore="公司" placeholder="上海复志信息技术有限公司" disabled />
			<Input className="act-inputOne" addonBefore="职位" placeholder="销售经理" />
			<Input className="act-inputOne" addonBefore="姓名" placeholder="张三" />
			<Input className="act-inputOne" addonBefore="邮箱" placeholder="213456@123.com" disabled />
			<div className="act-password">密码<span className="password-modify">点击修改</span></div>
			<Button className="act-preservation" type="button">保存</Button>
		</div>
	)
}

export default Account