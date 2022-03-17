import React from 'react'
import { Table } from 'antd';

function Study() {
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

		},

	];
	return (
		<div className="course-all">
			{/* 学习中 */}
			<div className="study-in">
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</div>
	)
}

export default Study