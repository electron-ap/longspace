import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Input } from 'antd';
import "../index.scss"
import { courseList } from "../../../libs/api"
import { Table } from 'antd';

function Study() {
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		courseList({ status: 1, page: pagination.current, limit: pagination.pageSize, }).then(res => {
			if (res.code === 200) {
				setDataSource({ data: res.data, total: res.count })
			}
		}).catch(err => { })
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

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