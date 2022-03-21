import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Input } from 'antd';
import "../index.scss"
import { courseList } from "../../../libs/api"
const { Search } = Input;
function Course() {
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		courseList({ status: 1, page: pagination.current, limit: pagination.pageSize, }).then(res => {
			if (res.code === 200) {
				setDataSource({ data: res.data, total: res.count })
			}
		}).catch(err => { })
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}


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
					{
						dataSource.data.map((item,index) => {
							return (
								<li key={`par${index}`}>
									<div className="course-series">
										<div className="course-series-left">
											{item.title}
											<span className={item.topic !=="0"?"courseon":""}></span></div>
										<button className="cs-ser-on cs-ser-showon">展开</button>
									</div>
									<div className="course-series-nr">
										{/* <div className="series-nr-list">
											<p className="srsnr-rt">开机教程<span className="srsnr-lf">（第1节）</span></p>
											<span className="srsnr-lf">最低学习时间：5min</span>
										</div> */}

										{
											item.children.map((child,indexc) => {
												return (
													<div className="series-nr-list" key={`par${indexc}`}>
														<p className="srsnr-rt">
														<Link to={{pathname:'/agent/courseDetail/'+child.user_course_id}}>{child.title}</Link></p>
														<span className="srsnr-lf">最低学习时间：{parseInt(child.min_long / 60)} min</span>
													</div>
												)
											})
										}
									</div>
								</li>
							)
						})
					}
				</ul>
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

export default Course