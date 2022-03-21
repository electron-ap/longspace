import React from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import "./index.css"
// 更改banner
import imgUrl from '../../assets/banner01.png'
const bgGround = {
    height: '400px',
    width: '100%',
    backgroundImage: 'url(' + imgUrl + ')'
}

function Dashboard() {
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
				<div className="contents-tle">Digital Assets</div>
				<div className="contents-nr">
					<ul>
						<li>
							<Link to="/agent/digital/list">
								<img className="pcte" alt="pcte01" src="/assets/pcte01.png" />
								<span className="pcte-tle">3D打印机</span>
							</Link>
						</li>
						<li>
							<Link to="/agent/digital/list">
								<img className="pcte" alt="pcte01" src="/assets/pcte01.png" />
								<span className="pcte-tle">3D打印机</span>
							</Link>
						</li><li>
							<Link to="/agent/digital/list">
								<img className="pcte" alt="pcte01" src="/assets/pcte01.png" />
								<span className="pcte-tle">3D打印机</span>
							</Link>
						</li><li>
							<Link to="/agent/digital/list">
								<img className="pcte" alt="pcte01" src="/assets/pcte01.png" />
								<span className="pcte-tle">3D打印机</span>
							</Link>
						</li>
						<li>
							<Link to="/agent/digital/list">
								<img className="pcte" alt="pcte01" src="/assets/pcte01.png" />
								<span className="pcte-tle">3D打印机</span>
							</Link>
						</li>

					</ul>
				</div>


				<div className="contents-tle">Tradeshows</div>
				<div className="contents-nr">
					<ul>
						<li>
							<Link to="/agent/academy/Academy">
								<img className="pcte" alt="pcte01" src="/assets/pcte11.png" />
								<span className="pcte-tle">Tradeshow Archive</span>
							</Link>
						</li>
					</ul>
				</div>
				<div className="contents-tle">Sales Partner Academy</div>
				<div className="contents-nr">
					<ul>
						<li>
							<Link to="/agent/academy/CourseList">
								<img className="pcte" alt="pcte01" src="/assets/pcte21.png" />
								<span className="pcte-tle">Sales Partner Academy</span>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Dashboard