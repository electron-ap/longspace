import React from 'react'
import { Pagination, Input } from 'antd';
import "../index.scss"
const { Search } = Input;
// 课程页面---利用 Ant Design 插件组件 定义Cert函数组件 
function Course() {
	const onSearch = value => console.log(value);
	return (
		<div className="course-all">
			<div className="course-search">
				<div className="cs-search-left">全部课程</div>
				<div className="cs-search-right">
					<Search placeholder="input search text" onSearch={onSearch} enterButton />
				</div>
			</div>
			<div className="course-all-tent">
				<ul>
					<li>
						<div className="course-series">
							<div className="course-series-left">001. Pro2系列教程<span className="courseon"></span></div>
							<button className="cs-ser-on cs-ser-showon">展开</button>
						</div>
						<div className="course-series-nr">
							<div className="series-nr-list">
								<p className="srsnr-rt">开机教程<span className="srsnr-lf">（第1节）</span></p>
								<span className="srsnr-lf">最低学习时间：5min</span>
							</div>
							<div className="series-nr-list">
								<p className="srsnr-rt">3D打印机操作教程<span className="srsnr-lf">（第1节）</span></p>
								<span className="srsnr-lf">最低学习时间：5min</span>
							</div>
						</div>
					</li>
					<li>
						<div className="course-series">
							<div className="course-series-left">001. Pro2系列教程<span className=""></span></div>
							<button className="cs-ser-on cs-ser-showon">展开</button>
						</div>
						<div className="course-series-nr">
							<div className="series-nr-list">
								<p className="srsnr-rt">开机教程<span className="srsnr-lf">（第1节）</span></p>
								<span className="srsnr-lf">最低学习时间：5min</span>
							</div>
							<div className="series-nr-list">
								<p className="srsnr-rt">3D打印机操作教程<span className="srsnr-lf">（第1节）</span></p>
								<span className="srsnr-lf">最低学习时间：5min</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
			<div className="course-paging">
				<Pagination defaultCurrent={1} total={50} />
			</div>
		</div>
	)
}

export default Course