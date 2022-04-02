import React, { useEffect, useState } from 'react'
import { Pagination,Table} from 'antd';
import { certList,memberCertList } from "../../../libs/api"
import { downLoadFile } from "../../../libs/utils/function"

function Cert(props) {

	let userId = props.match.params.user_id || ""

	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		if (userId && localStorage.getItem("userType") === "1") {
			memberCertList({  page: pagination.current, limit: pagination.pageSize,user_id:userId }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		}else{
			certList({  page: pagination.current, limit: pagination.pageSize, }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		}
		
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

	const handleDownLoad = (url) =>{
		downLoadFile(url)
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
			render: (text,record) => {
				return <div className="coursedload" onClick={ ()=>handleDownLoad(record.url)}><img alt="" src="/assets/course/coursedload.png" /></div>
			},
		},
	];
	return (
		<div className="course-all">
			{/* 考试 */}
			<div className="study-in">
				<Table dataSource={dataSource.data} rowKey="title" columns={columns} pagination={false} />
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

export default Cert