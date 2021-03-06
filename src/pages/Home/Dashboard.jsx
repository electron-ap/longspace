import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
<<<<<<< HEAD
import "./index.css"
// 更改banner
import imgUrl from '../../assets/banner01.png'
const bgGround = {
    height: '400px',
    width: '100%',
    backgroundImage: 'url(' + imgUrl + ')'
}
=======
import "./index.scss"

import { moduleList } from "../../libs/api"
>>>>>>> 076f52f93575177eb627961d02e5617820acb85b

function Dashboard() {
	const [digital, setDigital] = useState({})
	const [tradeShow, setTradeShow] = useState({})
	const [academy, setAcademy] = useState({})

	useEffect(() => {
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
                <div>
                    <div className="lunbo-box" style={bgGround}>
                        <h1>Welcome to <br />RAISE3D <br />Partner Portal</h1>
                    </div>
                </div>
                <div>
				<div className="lunbo-box" style={bgGround}>
                        <h1>Welcome to <br />RAISE3D <br />Partner Portal</h1>
                    </div>
                </div>
                <div>
				<div className="lunbo-box" style={bgGround}>
                        <h1>Welcome to <br />RAISE3D <br />Partner Portal</h1>
                    </div>
                </div>
				</Carousel>
			</div>
			<div className="contents">
				<div className="contents-tle">{digital.title}</div>
				<div className="contents-nr">
					<ul>
						{
							digital.children && digital.children.map((item) => {
								return (<li key={item.nav_id}>
									<Link to={{pathname:"/agent/digital/channels",state:{nav_id:item.nav_id}}}>
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