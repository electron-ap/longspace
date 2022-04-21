import React from 'react'
import { Link } from 'react-router-dom';
import { Table } from 'antd';
// Finished 函数组件 
function Finished() {
	const dataSource = [
		{
			key: '1',
			name: '开机',
			publisher: '2min',
			address: '1min35s',
			size: '2022-12-12',
			uploadtime: '',
		},
		{
			key: '2',
			name: '如何添加辅料',
			publisher: '5min',
			address: '1min30s',
			size: '2022-12-12',
			uploadtime: '',
		},
		{
			key: '3',
			name: '开机',
			publisher: '2min',
			address: '1min35s',
			size: '2022-12-12',
			uploadtime: '',
		},
		{
			key: '4',
			name: '如何添加辅料',
			publisher: '5min',
			address: '1min30s',
			size: '2022-12-12',
			uploadtime: '',
		},
	];

	const columns = [
		{
			title: '课程名称',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: '最低学习时间',
			dataIndex: 'publisher',
			key: 'publisher',
		},
		{
			title: '已学习时间',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '截止日期',
			dataIndex: 'size',
			key: 'size',
		},
		{
			title: '进入考试',
			dataIndex: 'uploadtime',
			key: 'uploadtime',
			// render: 方法  渲染函数  Link 对应跳转
			render: (text) => {
				return <Link to="/agent/academy/Testing"><div className="course-enter">{text}进入考试</div></Link>
			}
		},

	];
	return (
		<div className="course-all">
			{/* 已完成 */}
			<div className="study-in">
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</div>
	)
}

export default Finished