import React from 'react'
import { Link } from 'react-router-dom';
import { Carousel } from 'antd';
import "./index.css"
function Dashboard() {
	return (
		<>
			<div className="mybanner">
				<Carousel autoplay>
					<div>
						<h3><img alt="banner01" src="/assets/banner01.png" /></h3>
					</div>
					<div>
						<h3><img alt="banner01" src="/assets/banner01.png" /></h3>
					</div>
					<div>
						<h3><img alt="banner01" src="/assets/banner01.png" /></h3>
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
							<img className="pcte" alt="pcte01" src="/assets/pcte11.png" />
							<span className="pcte-tle">Tradeshow Archive</span>
						</li>
					</ul>
				</div>
				<div className="contents-tle">Sales Partner Academy</div>
				<div className="contents-nr">
					<ul>
						<li>
							<img className="pcte" alt="pcte01" src="/assets/pcte21.png" />
							<span className="pcte-tle">Sales Partner Academy</span>
						</li>
					</ul>
				</div>
			</div>
		</>
	)
}

export default Dashboard