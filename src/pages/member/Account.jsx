import React, { useEffect, useState } from 'react'
import { Input, Button, message } from 'antd';
import { userInfo, userSave, userModifyPwd } from "../../libs/api"
import { useLangContext } from '../../libs/utils/context'
// import "./index.scss"
function Account(props) {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

	const { memberInfo } = props;
	const [position, setPosition] = useState(memberInfo.setPosition)
	const [name, setName] = useState(memberInfo.name)

	const [modalVisible, setModalVisible] = useState(false)
	const [oldPwd, setOldPwd] = useState("")
	const [newPwd, setNewPwd] = useState("")
	const [newPwds, setNewPwds] = useState("")

	const handleSubmit = () => {
		console.log("position", position)
		userSave({ position: position === undefined ? memberInfo.position : position, name: name === undefined ? memberInfo.name : name }).then(res => {
			message.info(res.msg)
		}).catch(err => {

		})
	}

	// 修改密码
	const showModal= () => {
		setModalVisible(true);
	}
	const closeModal= () => {
		setModalVisible(false);
	}
	const handlePwdSubmit = () => {
		if(oldPwd === ""){
			message.error("请输入原密码！")
			return false;
		}
		if(newPwd === "" || newPwd.length <6){
			message.error("新密码不得低于6位数")
			return false;
		}
		if(newPwd !== newPwds){
			message.error("两次密码输入不一致")
			return false;
		}
		userModifyPwd({ password: oldPwd,new:newPwd,again:newPwds }).then(res => {
			message.info(res.msg)
			if(res.code === 204){
				setModalVisible(false)
			}
		}).catch(err => {

		})
	}

	return (
		<>
			<div className="act-iftion">
				<Input className="act-inputOne" addonBefore={langConfig.p_acc} key={memberInfo.account} value={memberInfo.account} disabled />
				<Input className="act-inputOne" addonBefore={langConfig.p_company} key={memberInfo.company} value={memberInfo.company} disabled />
				<Input className="act-inputOne" addonBefore={langConfig.p_job} key={memberInfo.position} defaultValue={memberInfo.position} onChange={e => { setPosition(e.target.value) }} />
				<Input className="act-inputOne" addonBefore={langConfig.p_name} key={memberInfo.name} defaultValue={memberInfo.name} onChange={e => { setName(e.target.value) }} />
				<Input className="act-inputOne" addonBefore={langConfig.p_email} key={memberInfo.email} value={memberInfo.email} disabled />
				<div className="act-password">{langConfig.p_pwd}<span className="password-modify" onClick={showModal}>{langConfig.p_click_mod}</span></div>
				<button className="act-preservation-save" type="button" onClick={handleSubmit}>{langConfig.btn_ok}</button>
			</div>

			<div className="password-wraper" style={{ display: modalVisible ? "block" : "none" }}></div>
			<div className="password-box" style={{ display: modalVisible ? "block" : "none" }}>
				<div className="password-box-tle">{langConfig.p_mod_pwd}</div>
				<div className="member-box-input">
					<Input className="member-input pwd-input" placeholder={langConfig.login_pwd_text} onChange={e => { setOldPwd(e.target.value) }} />
					<Input className="member-input pwd-input"  placeholder={langConfig.p_new_pwd} onChange={e => { setNewPwd(e.target.value) }} />
					<Input className="member-input pwd-input"  placeholder={langConfig.enter_pwd_again} onChange={e => { setNewPwds(e.target.value) }} />
				</div>
				<Button className="act-cancel" type="button" onClick={closeModal} >取消</Button>
				<Button className="act-confirm" type="button" onClick={handlePwdSubmit}>确认</Button>
			</div>
		</>

	)
}

export default Account