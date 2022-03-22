import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Input ,Table} from 'antd';
import { examList } from "../../../libs/api"

function Exam() {
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		examList({  page: pagination.current, limit: pagination.pageSize, }).then(res => {
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
			title: '考试',
			dataIndex: 'title',
			key: 'title',
			width: 220,

		},
		{
			title: '课程名称',
			dataIndex: 'course',
			key: 'course',
			width: 220,
		},
		{
			title: '考试时间',
			dataIndex: 'start_time',
			key: 'start_time',
			width: 210,
		},
		{
			title: '考试状态',
			dataIndex: 'size',
			key: 'size',
			width: 120,
			align: 'center',
			render: (text) => {
				if (text === "1") {
					return <div className="exam-passed">PASSED</div>
				} else if (text === "3") {
					return <div className="exam-failed">FAILED</div>
				}
				return <div className="exam-makeup">MAKE-UP</div>
			}
		},
		{
			title: '补考次数',
			dataIndex: 'remaining',
			key: 'timremaininge',
			align: 'center',
		},
		{
			title: '时长',
			dataIndex: 'how_long',
			key: 'how_long',
		},
	];
	return (
		<div className="course-all">
			{/* 考试 */}
			<div className="study-in">
				<Table dataSource={dataSource.data} columns={columns} pagination={false} />
			</div>
			<div className="course-paging">
				<Pagination
					size="small"
					current={pagination.current}
					pageSize={pagination.pageSize}
					total={dataSource.total}
					onChange={val => onPageChange(val)}
				/>
			</div>
		</div>
	)
}

export default Exam