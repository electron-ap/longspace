import React from 'react'
import { Input, Button } from 'antd';
import { NavLink } from 'react-router-dom'
import "./index.scss"

function Index(props) {
	console.log(props)
	return (
		<>
			<div style={{
				width: '100%',
				height: '240px',
				background: 'url(/assets/cs-baner.png) no-repeat center center fixed',
				backgroundSize: 'cover',
			}} className="admined-banner">
				<div className="admined-tent">
					<div className="admined-rln">当前位置：<span className="admined-index">首页</span> - <span>个人中心</span></div>
				</div>
			</div>
			<div className="admin-wraper">
				<div className="admin-head">
					<div className="admin-head-pc"></div>
					<div className="admin-head-upload"></div>
					<div className="admin-head-name">RDL00001</div>
				</div>
				<div className="admin-sort">
					<ul className="admin-sort-ul">

						<NavLink className="sort-li" to="/agent/member/Account" activeClassName="sort-li-active" >账号信息</NavLink>
						<NavLink className="sort-li" to="/agent/member/Favorites" activeClassName="sort-li-active" >收藏夹</NavLink>
						<NavLink className="sort-li" to="/agent/member/Staff" activeClassName="sort-li-active" >我的成员</NavLink>
					</ul>
				</div>

				<div className="admin-sort-tent">
					{/* <div className="act-iftion">
						<Input className="act-inputOne" addonBefore="账号" placeholder="RDL00001" disabled />
						<Input className="act-inputOne" addonBefore="公司" placeholder="上海复志信息技术有限公司" disabled />
						<Input className="act-inputOne" addonBefore="职位" placeholder="销售经理" />
						<Input className="act-inputOne" addonBefore="姓名" placeholder="张三" />
						<Input className="act-inputOne" addonBefore="邮箱" placeholder="213456@123.com" disabled />
						<div className="act-password">密码<span className="password-modify">点击修改</span></div>
						<Button className="act-preservation" type="button">保存</Button>
					</div> */}

					{props.children}
				</div>

			</div>
		</>
	)
}

export default Index