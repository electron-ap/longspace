import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import "./index.scss"

import { moduleList, swiperList, msgList,msgRead } from "../../libs/api"
import { useLangContext } from '../../libs/utils/context'

function Dashboard() {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

	const [digital, setDigital] = useState({})
	const [tradeShow, setTradeShow] = useState({})
	const [academy, setAcademy] = useState({})
	const [swiperData, setSwiperData] = useState([])
	const [popMsgList, setPopMsgList] = useState([])

	const [modalVisible, setModalVisible] = useState(false)
	const closeModal = () => {
		if(popMsgList.length > 0){
			let _ids = []
			popMsgList.forEach(item=>{
				_ids.push(item.mess_id)
			})
			msgRead({mess:JSON.stringify(_ids)}).then(res => {
				if (res.code === 200) {
					setDigital(res.data[0])
					setTradeShow(res.data[2])
					setAcademy(res.data[1])
				}
			}).catch(err => { })
		}
		
		setModalVisible(false)
	}

	useEffect(() => {
		swiperList().then(res => {
			if (res.code === 200) {
				setSwiperData(res.data)
			}
		}).catch(err => { })

		moduleList().then(res => {
			if (res.code === 200) {
				setDigital(res.data[0])
				setTradeShow(res.data[2])
				setAcademy(res.data[1])
			}
		}).catch(err => { })

		msgList({}).then(res => {
			if (res.code === 200) {
				setPopMsgList(res.data.popup.data)
				setModalVisible(res.data.popup.data.length?true:false)
			}
		}).catch(err => { })
	}, [])


	const checkAgentOrStaff = () => {
		// if (localStorage.getItem("userType") === "2") {
			return (
				<>
					<div className="contents-tle">{academy.title}</div>
					<div className="contents-nr">
						<ul>
							{
								academy.children && academy.children.map((item) => {
									return (<li key={item.nav_id}>
										<Link to="/agent/academy/CourseList">
											<img className="pcte" alt="pcte01" src={item.cover} />
											<span className="pcte-tle">{item.title}</span>
										</Link>
									</li>)
								})
							}
						</ul>
					</div>
				</>
			)
		// } else {
		// 	return null
		// }
	}
	return (
		<>
			<div className="mybanner">
				<Carousel autoplay>
					{
						swiperData.map((item, index) => {
							return (
								<div key={index}>
									<div className="lunbo-box" style={{
										height: '472px',
										width: '100%',
										backgroundImage: `url(${item.file_url})`,
										backgroundSize: "100% 100%"
									}}>
										<h1>{item.title}</h1>
									</div>
								</div>
							)
						})
					}

				</Carousel>
			</div>
			<div className="contents">
				<div className="contents-tle">{digital.title}</div>
				<div className="contents-nr">
					<ul>
						{
							digital.children && digital.children.map((item) => {
								return (<li key={item.nav_id}>
									<Link to={{ pathname: "/agent/digital/channels", state: { nav_id: item.nav_id } }}>
										<img className="pcte" alt="pcte01" src={item.cover} />
										<span className="pcte-tle">{item.title}</span>
									</Link>
								</li>)
							})
						}
					</ul>
				</div>


				<div className="contents-tle">{tradeShow.title}</div>
				<div className="contents-nr">
					<ul>
						{
							tradeShow.children && tradeShow.children.map((item) => {
								return (<li key={item.nav_id}>
									<Link to={{ pathname: "/agent/tradeShow/", state: { nav_id: item.nav_id } }}>
										<img className="pcte" alt="pcte01" src={item.cover} />
										<span className="pcte-tle">{item.title}</span>
									</Link>
								</li>)
							})
						}
					</ul>
				</div>
				{
					checkAgentOrStaff()
				}
			</div>

			{/* 2022-04-02 新增弹窗 ↓↓ */}
			<div className="prompt-wraper" style={{ display: modalVisible ? "block" : "none" }}></div>
			<div className="prompt-box" style={{ display: modalVisible ? "block" : "none" }}>
				<div className="prompt-tle">{langConfig.Notification}</div>
				<div className="prompt-tent">
					<p className="prompt-p-ste">{langConfig.recent_update}</p>
					{
						popMsgList.map((item,index) => {
							return (
								<p key={index} className="prompt-p-ste prompt-p-col">
									{/* <Link to={`/fileDetail/?type=${item.mime}&url=${item.url}`} target="_blank" key={item.mess_id}>
										{item.title}
									</Link> */}
									{item.title}
								</p>
							)
						})
					}
				</div>
				<button className="prompt-btn" onClick={closeModal}>关闭</button>
			</div>
			{/* 2022-04-02 新增弹窗 ↑↑ */}
			<div style={{ height: '90px' }}></div>
		</>
	)
}

export default Dashboard