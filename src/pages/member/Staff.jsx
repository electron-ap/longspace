import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom';
import { Button, Input, message } from 'antd';
import { myMemberList, myMemberApply, myMemberRemove } from "../../libs/api"
import { useLangContext } from '../../libs/utils/context'

function Staff() {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

	const history = useHistory();
	const [modalVisible, setModalVisible] = useState(false)
	const [modalDelVisible, setModalDelVisible] = useState(false)
	const [modalAddVisible, setModalAddVisible] = useState(false)
	const [modalMemberInfo, setModalMemberInfo] = useState({})

	const [name, setName] = useState("")
	const [position, setPosition] = useState("")
	const [email, setEmail] = useState("")

	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 100 })
	useEffect(() => {
		getDataSource()
	}, [])
	const getDataSource = () => {
		myMemberList({ page: pagination.current, limit: pagination.pageSize, }).then(res => {
			if (res.code === 200 && res.data.length > 0) {
				setDataSource({ data: res.data, total: res.count })
			}
		}).catch(err => { })
	}
	// const onPageChange = (val) => {
	// 	setPagination({ ...pagination, current: val })
	// }

	const showMemberAdd = () => {
		setName("")
		setPosition("")
		setEmail("")
		setModalVisible(true);
		setModalAddVisible(true);
	}
	const closeMemberAdd = () => {
		setModalVisible(false);
		setModalAddVisible(false);
	}
	const submitMemberAdd = () => {
		myMemberApply({ name, position, email }).then(res => {
			if (res.code === 204) {
				getDataSource()
				setModalVisible(false);
				setModalAddVisible(false);
			}
			message.info(res.msg)
		}).catch(err => { })
	}


	const showMemberRemove = (obj) => {
		setModalMemberInfo(obj)
		setModalVisible(true);
		setModalDelVisible(true);
	}
	const closeMemberRemove = () => {
		setModalVisible(false);
		setModalDelVisible(false);
	}
	const submitMemberRemove = () => {
		myMemberRemove({ email: modalMemberInfo.email }).then(res => {
			if (res.code === 204) {
				getDataSource()
				setModalVisible(false);
				setModalDelVisible(false);
			}
			message.info(res.msg)
		}).catch(err => { })
	}

	const setCourse = (user_id) =>{
		// /agent/academy/CourseList
		history.push({pathname:`/agent/academy/CourseList/${user_id}`})
	}

	return (
		<>
			<div className="admin-sort-tent">
				<div className="favorites-box">
					<div className="frts-tle">{langConfig.total}：{dataSource.total} <span className="add-members" onClick={showMemberAdd}>{langConfig.apply_add_staff}+</span></div>
					<div className="frts-tent">
						<ul className="member-ul">
							{
								dataSource.data && dataSource.data.map((item, index) => {
									return (
										<li className="member-li" key={index}>
											<div className="member-li-box">
												<img className="member-img" src="/assets/admin/headpc.png" alt="" />
												<div className="member-li-tle">{item.name}</div>
												<div className="member-li-p">{item.email}</div>
												<ul className="member-chengeli">
													<li><span>{langConfig.c_study}</span><p>{item.summary.study}</p></li>
													<li><span>{langConfig.c_complete}</span><p>{item.summary.complete}</p></li>
													<li><span>{langConfig.c_test}</span><p>{item.summary.test}</p></li>
													<li><span>{langConfig.c_cert}</span><p>{item.summary.certificate}</p></li>
												</ul>
												<div className="member-setup">
													<button className="member-up" onClick={()=>{setCourse(item.user_id)}}>课程设置</button>
													<button className="member-remove" onClick={() => showMemberRemove(item)}>删除</button>
												</div>
											</div>
										</li>
									)
								})
							}

						</ul>
					</div>
				</div>
			</div>

			<div className="password-wraper" style={{ display: modalVisible ? "block" : "none" }}></div>
			<div className="password-box" style={{ display: modalDelVisible ? "block" : "none" }}>
				<div className="password-box-tle">申请删除成员</div>
				<div className="member-box-p">
					<p>姓名：{modalMemberInfo.name}</p>
					<p>职位：{modalMemberInfo.company}</p>
					<p>邮箱：{modalMemberInfo.email}</p>
				</div>
				<Button className="act-cancel" type="button" onClick={closeMemberRemove}>取消</Button>
				<Button className="act-confirm" type="button" onClick={submitMemberRemove}>提交申请</Button>
			</div>
			<div className="password-box" style={{ display: modalAddVisible ? "block" : "none" }}>
				<div className="password-box-tle">{langConfig.apply_add_staff}</div>
				<div className="member-box-input">
					<Input className="member-input" prefix={langConfig.p_name} placeholder="请填写成员姓名" onChange={e => { setName(e.target.value) }} />
					<Input className="member-input" prefix={langConfig.p_job} placeholder="请填写成员职位" onChange={e => { setPosition(e.target.value) }} />
					<Input className="member-input" prefix={langConfig.p_email} placeholder="请填写成员电子邮箱" onChange={e => { setEmail(e.target.value) }} />
				</div>
				<Button className="act-cancel" type="button" onClick={closeMemberAdd} >{langConfig.btn_cancel}</Button>
				<Button className="act-confirm" type="button" onClick={submitMemberAdd}>{langConfig.btn_ok}</Button>
			</div>
		</>
	)
}

export default Staff