import React from 'react'
import { Table } from 'antd';
// 证书页面---利用 Ant Design 插件组件 定义Cert函数组件 
function Cert() {
	const dataSource = [
		{
			key: '1',
			name: '3D打印开关机',
			publisher: '2022-12-12',
			address: '永久',
			size: '',
		},
		{
			key: '2',
			name: '3D打印开关机',
			publisher: '2022-12-12',
			address: '永久',
			size: '',
		},
		{
			key: '3',
			name: '3D打印开关机',
			publisher: '2022-12-12',
			address: '永久',
			size: '',
		},
		{
			key: '4',
			name: '3D打印开关机',
			publisher: '2022-12-12',
			address: '永久',
			size: '',
		},
		{
			key: '5',
			name: '3D打印开关机',
			publisher: '2022-12-12',
			address: '永久',
			size: '',
		},

	];

	const columns = [
		{
			title: '证书名称',
			dataIndex: 'name',
			key: 'name',

		},
		{
			title: '颁发日期',
			dataIndex: 'publisher',
			key: 'publisher',
		},
		{
			title: '失效日期',
			dataIndex: 'address',
			key: 'address',
		},
		{
			title: '下载',
			dataIndex: 'size',
			key: 'size',
			width: 100,
			align: 'center',
			//render: () => {} 渲染函数组件 方法
			render: () => {
				return <div className="coursedload"><img alt="" src="/assets/course/coursedload.png" /></div>
			},
		},
	];
	return (
		<div className="course-all">
			{/* 考试 */}
			<div className="study-in">
				<Table dataSource={dataSource} columns={columns} />
			</div>
		</div>
	)
}

export default Cert