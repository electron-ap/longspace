import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Button, Pagination, Modal, message } from 'antd';
import { favoritesList,favoritesRemove } from "../../libs/api"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { useLangContext } from '../../libs/utils/context'
const { confirm } = Modal;

function Favorites() {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

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
			title: `${langConfig.comfirm_del}`,
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

	const itemFileType = (item) => {
        // if (["MP4", "PDF"].includes(item.type)) {
        //     return (<Link to={`/fileDetail/?type=${item.type}&url=${item.url}`}  target="_blank" className='frts-up'>{langConfig.look}</Link>)
        // } else {
        //     return (<a href={item.url} target="_blank" className='frts-up' rel="noreferrer">{langConfig.look}</a>)
        // }
		return (<Link to={`/fileDetail/?type=${item.type}&url=${item.url}`}  target="_blank" className='frts-up'>{langConfig.look}</Link>)
    }

	return (
		<>
			<div className="favorites-box">
				<div className="frts-tle">{langConfig.total}：{dataSource.total}</div>
				<div className="frts-tent">
					<ul className="frts-ul">
						{
							dataSource.data.length > 0 && dataSource.data.map(item => {
								return (
									<li className="frts-li" key={item.favorites_id}>
										<div className="frts-li-box">
											<div className="frts-li-tle">{item.file_name}</div>
											<div className="frts-li-p">{langConfig.belongs_cate}：{item.nav}</div>
											{itemFileType(item)}
											<button className="frts-remove" onClick={()=>removeMyFavorites(item.favorites_id)}>{langConfig.remove}</button>
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