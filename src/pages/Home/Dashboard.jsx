import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import "./index.scss"

import { moduleList, swiperList } from "../../libs/api"

function Dashboard() {
	const [digital, setDigital] = useState({})
	const [tradeShow, setTradeShow] = useState({})
	const [academy, setAcademy] = useState({})
	const [swiperData, setSwiperData] = useState([])


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
	}, [])
	return (
		<>
			<div className="mybanner">
				<Carousel autoplay>
					{
						swiperData.map((item, index) => {
							return (
								<div key={index}>
									<div className="lunbo-box" style={{
										height: '400px',
										width: '100%',
										backgroundImage:`url(${item.file_url})`
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
									<Link to="/agent/academy/Academy">
										<img className="pcte" alt="pcte01" src={item.cover} />
										<span className="pcte-tle">{item.title}</span>
									</Link>
								</li>)
							})
						}
					</ul>
				</div>
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
			</div>
		</>
	)
}

export default Dashboard