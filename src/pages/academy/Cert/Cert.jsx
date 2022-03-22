import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Input ,Table} from 'antd';
import { certList } from "../../../libs/api"

function Cert() {
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		certList({  page: pagination.current, limit: pagination.pageSize, }).then(res => {
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
			title: '证书名称',
			dataIndex: 'title',
			key: 'title',

		},
		{
			title: '颁发日期',
			dataIndex: 'create_time',
			key: 'create_time',
		},
		{
			title: '失效日期',
			dataIndex: 'validity_time',
			key: 'validity_time',
		},
		{
			title: '下载',
			dataIndex: 'size',
			key: 'size',
			width: 100,
			align: 'center',
			render: () => {
				return <div className="coursedload"><img alt="" src="/assets/course/coursedload.png" /></div>
			},
		},
	];
	return (
		<div className="course-all">
			{/* 考试 */}
			<div className="study-in">
				<Table dataSource={dataSource.data} rowKey="title" columns={columns} />
			</div>
		</div>
	)
}

export default Cert