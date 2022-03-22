import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Input } from 'antd';
import { Table } from 'antd';
import "../index.scss"
import { courseList } from "../../../libs/api"

function Finished() {
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		courseList({ status: 3, page: pagination.current, limit: pagination.pageSize, }).then(res => {
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
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: '最低学习时间',
			dataIndex: 'min_long',
			key: 'min_long',
		},
		{
			title: '已学习时间',
			dataIndex: 'study_time',
			key: 'study_time',
		},
		{
			title: '截止日期',
			dataIndex: 'end_time',
			key: 'end_time',
		},
		{
			title: '进入考试',
			dataIndex: 'topic',
			key: 'topic',
			render: (text,record) => {
				return <Link to={{pathname:"/agent/academy/Testing/"+record.topic}}><div className="course-enter">进入考试</div></Link>
			}
		},

	];
	return (
		<div className="course-all">
			{/* 已完成 */}
			<div className="study-in">
				<Table dataSource={dataSource.data} rowKey="user_course_id" columns={columns} />
			</div>
		</div>
	)
}

export default Finished