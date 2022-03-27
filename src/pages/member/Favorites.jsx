import React, { useState, useEffect } from 'react'
import { Button, Pagination, Modal, message } from 'antd';
import { favoritesList,favoritesRemove } from "../../libs/api"
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

function Favorites() {
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])
	const getDataSource = () => {
		favoritesList({ page: pagination.current, limit: pagination.pageSize, }).then(res => {
			if (res.code === 200 && res.data.length > 0) {
				setDataSource({ data: res.data, total: res.count })
			}
		}).catch(err => { })
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

	const removeMyFavorites = (val) => {
		confirm({
			title: '确定删除吗？',
			icon: <ExclamationCircleOutlined />,
			onOk() {
				favoritesRemove({ favorites_id:val }).then(res => {
					if (res.code === 204) {
						getDataSource();
					}
					message.info(res.msg);
				}).catch(err => { })
			},
			onCancel() {
				
			},
		});
	}

	return (
		<>
			<div className="favorites-box">
				<div className="frts-tle">收藏夹内容数量：{dataSource.total}</div>
				<div className="frts-tent">
					<ul className="frts-ul">
						{
							dataSource.data.length > 0 && dataSource.data.map(item => {
								return (
									<li className="frts-li" key={item.favorites_id}>
										<div className="frts-li-box">
											<div className="frts-li-tle">{item.file_name}</div>
											<div className="frts-li-p">所属分类：{item.nav}</div>
											<button className="frts-up">查看</button>
											<button className="frts-remove" onClick={()=>removeMyFavorites(item.favorites_id)}>移除</button>
										</div>
									</li>
								)
							})
						}
					</ul>
				</div>
				<div className="frts-page">
					<Pagination
						size="small"
						current={pagination.current}
						pageSize={pagination.pageSize}
						total={dataSource.total}
						onChange={val => onPageChange(val)}
					/>
				</div>
			</div>
			{/* 弹窗地址 */}
			<div className="frts-wraper" style={{ display: "none" }}></div>
			<div className="frts-box" style={{ display: "none" }}>
				<div className="frts-box-tle">提示</div>
				<div className="frts-box-p"><span>是否删除该数据？</span></div>
				<Button className="frts-cancel" type="button">取消</Button>
				<Button className="frts-confirm" type="button">确认</Button>
			</div>
		</>
	)
}

export default Favorites