import React from 'react'
import "./index.scss"

function Index(props) {
	return (
		<div className="admin-wraper">
			<div className="admin-head">
				<div className="admin-head-pc"></div>
				<div className="admin-head-upload"></div>
				<div className="admin-head-name">RDL00001</div>
			</div>
			<div className="admin-sort">
				<ul className="admin-sort-ul">
					<li className="sort-li sort-li-active">账号信息</li>
					<li className="sort-li">收藏夹</li>
				</ul>
			</div>
			
			{props.children}
		</div>
	)
}

export default Index