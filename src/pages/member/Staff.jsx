import React from 'react'
import { Table, Button, Input } from 'antd';

function Staff() {
	// 表格
	const dataSource = [
		{
			key: '1',
			study: '12',
			ok: 3,
			exams: '2',
			books: '2',
		},
	];

	const columns = [
		{
			title: '学习中',
			dataIndex: 'study',
			key: 'study',
			width: 50,
		},
		{
			title: '已完成',
			dataIndex: 'ok',
			key: 'ok',
		},
		{
			title: '考试',
			dataIndex: 'exams',
			key: 'exams',
		},
		{
			title: '证书',
			dataIndex: 'books',
			key: 'books',
			width: 40,
		},
	];
	return (
		<>
			<div className="favorites-box">
				<div className="frts-tle">当前成员：6 <span className="add-members">申请增加成员+</span></div>
				<div className="frts-tent">
					<ul className="member-ul">
						<li className="member-li">
							<div className="member-li-box">
								<img className="member-img" src="/assets/admin/headpc.png" alt="" />
								<div className="member-li-tle">张三</div>
								<div className="member-li-p">123@123.com</div>
								<div className="member-table">
									<Table dataSource={dataSource} columns={columns} pagination={false} />
								</div>
								<div className="member-setup">
									<button className="member-up">课程设置</button>
									<button className="member-remove">删除</button>
								</div>
							</div>
						</li>
						<li className="member-li">
							<div className="member-li-box">
								<img className="member-img" src="../../assets/admin/headpc.png" alt="" />
								<div className="member-li-tle">张三</div>
								<div className="member-li-p">123@123.com</div>
								<div className="member-table">
									<Table dataSource={dataSource} columns={columns} pagination={false} />
								</div>
								<div className="member-setup">
									<button className="member-up">课程设置</button>
									<button className="member-remove">删除</button>
								</div>
							</div>
						</li>
						<li className="member-li">
							<div className="member-li-box">
								<img className="member-img" src="../../assets/admin/headpc.png" alt="" />
								<div className="member-li-tle">张三</div>
								<div className="member-li-p">123@123.com</div>
								<div className="member-table">
									<Table dataSource={dataSource} columns={columns} pagination={false} />
								</div>
								<div className="member-setup">
									<button className="member-up">课程设置</button>
									<button className="member-remove">删除</button>
								</div>
							</div>
						</li>
						<li className="member-li">
							<div className="member-li-box">
								<img className="member-img" src="../../assets/admin/headpc.png" alt="" />
								<div className="member-li-tle">张三</div>
								<div className="member-li-p">123@123.com</div>
								<div className="member-table">
									<Table dataSource={dataSource} columns={columns} pagination={false} />
								</div>
								<div className="member-setup">
									<button className="member-up">课程设置</button>
									<button className="member-remove">删除</button>
								</div>
							</div>
						</li>
						<li className="member-li">
							<div className="member-li-box">
								<img className="member-img" src="../../assets/admin/headpc.png" alt="" />
								<div className="member-li-tle">张三</div>
								<div className="member-li-p">123@123.com</div>
								<div className="member-table">
									<Table dataSource={dataSource} columns={columns} pagination={false} />
								</div>
								<div className="member-setup">
									<button className="member-up">课程设置</button>
									<button className="member-remove">删除</button>
								</div>
							</div>
						</li>
						<li className="member-li">
							<div className="member-li-box">
								<img className="member-img" src="../../assets/admin/headpc.png" alt="" />
								<div className="member-li-tle">张三</div>
								<div className="member-li-p">123@123.com</div>
								<div className="member-table">
									<Table dataSource={dataSource} columns={columns} pagination={false} />
								</div>
								<div className="member-setup">
									<button className="member-up">课程设置</button>
									<button className="member-remove">删除</button>
								</div>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div className="password-wraper" style={{ display: "none" }}></div>
			<div className="password-box" style={{ display: "none" }}>
				<div className="password-box-tle">申请删除成员</div>
				<div className="member-box-p">
					<p>姓名：张三</p>
					<p>职位：经理</p>
					<p>邮箱：123@123.com</p>
				</div>
				<Button className="act-cancel" type="button">取消</Button>
				<Button className="act-confirm" type="button">提交申请</Button>
			</div>
			<div className="password-box" style={{ display: "none" }}>
				<div className="password-box-tle">申请增加成员</div>
				<div className="member-box-input">
					<Input className="member-input" prefix="姓名：" placeholder="请填写成员姓名" />
					<Input className="member-input" prefix="职位：" placeholder="请填写成员职位" />
					<Input className="member-input" prefix="邮箱：" placeholder="请填写成员电子邮箱" />
				</div>
				<Button className="act-cancel" type="button">取消</Button>
				<Button className="act-confirm" type="button">提交申请</Button>
			</div>
		</>
	)
}

export default Staff