import React, { useEffect, useState } from 'react'
import { Button, Input, message } from 'antd';
import { myMemberList, myMemberApply, myMemberRemove } from "../../libs/api"

function Staff() {
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
	// useEffect(() => {
	// 	getDataSource()
	// }, [pagination])
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
		myMemberApply({ name,position,email }).then(res => {
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

	return (
		<>
			<div className="admin-sort-tent">
				<div className="favorites-box">
					<div className="frts-tle">当前成员：{dataSource.total} <span className="add-members" onClick={showMemberAdd}>申请增加成员+</span></div>
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
													<li><span>学习中</span><p>{item.summary.study}</p></li>
													<li><span>已完成</span><p>{item.summary.complete}</p></li>
													<li><span>考试</span><p>{item.summary.complete}</p></li>
													<li><span>证书</span><p>{item.summary.certificate}</p></li>
												</ul>
												<div className="member-setup">
													<button className="member-up">课程设置</button>
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
				<div className="password-box-tle">申请增加成员</div>
				<div className="member-box-input">
					<Input className="member-input" prefix="姓名：" placeholder="请填写成员姓名" onChange={e => { setName(e.target.value) }}  />
					<Input className="member-input" prefix="职位：" placeholder="请填写成员职位" onChange={e => { setPosition(e.target.value) }}/>
					<Input className="member-input" prefix="邮箱：" placeholder="请填写成员电子邮箱" onChange={e => { setEmail(e.target.value) }}/>
				</div>
				<Button className="act-cancel" type="button" onClick={closeMemberAdd} >取消</Button>
				<Button className="act-confirm" type="button" onClick={submitMemberAdd}>提交申请</Button>
			</div>
		</>
	)
}

export default Staff