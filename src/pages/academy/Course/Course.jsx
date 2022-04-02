import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { Pagination, Input, Checkbox, Tree } from 'antd';
import "../index.scss"
import { courseList, memberCourseList, memberCourseOnOff } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import { message } from 'antd';
const { Search } = Input;
function Course(props) {
	const [agentAdmin, setAgentAdmin] = useState(false);
	const [keyword, setKeyword] = useState("");
	console.log("course props", props)
	let userId = props.match.params.user_id || ""

	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		if (userId && localStorage.getItem("userType") === "1") {
			setAgentAdmin(true)
		}
	}, [])

	useEffect(() => {
		getDataSource()
	}, [pagination, keyword])

	const getDataSource = () => {

		if (userId && localStorage.getItem("userType") === "1") {
			memberCourseList({ page: pagination.current, limit: pagination.pageSize, user_id: userId }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		} else {
			courseList({ status: 1, page: pagination.current, limit: pagination.pageSize, keyword }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		}

	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

	const onSearch = value => {
		setKeyword(value)
		setPagination({ ...pagination, current: 1 })
	};


	const [defaultCheckList, setDefaultCheckList] = useState([])
	const [onOffStatus, setOnOffStatus] = useState(1) // 开放关闭课程
	const onCheckAllChange = (val) => {

	}
	const onCheckBoxChange = (val) => {
		console.log("onCheckBoxChange", val)
		// setDefaultCheckList(val)
	}
	const openCourse = () => {
		setOnOffStatus(1)
		handleMemberCourseOnOff()
	}
	const closeCourse = () => {
		setOnOffStatus(0)
		handleMemberCourseOnOff()
	}

	// 开放 关闭 课程
	const handleMemberCourseOnOff = () => {
		memberCourseOnOff({ user_id: 33, course: JSON.stringify([54,55,56]), status: onOffStatus }).then(res => {
			message.info(res.msg)
		}).catch(err => {

		})
	}

	return (
		<div className="course-all">
			<div className="course-search">
				<div className="cs-search-left">全部课程</div>
				<div className="cs-search-right">
					<Search placeholder="搜索课程" onSearch={onSearch} enterButton />
				</div>
			</div>
			{
				agentAdmin ? (<div className='auth-course-box'>
					<div className='chk-box'><Checkbox onChange={onCheckAllChange}><span>全选</span></Checkbox></div>
					<div className='auth-btn' style={{ color: "#0150C8" }} onClick={openCourse}>开放课程</div>
					<div className='auth-btn' style={{ color: "#C30D23" }} onClick={closeCourse}>关闭课程</div>
				</div>) : null
			}


			<Checkbox.Group style={{ width: "100%" }} defaultValue={defaultCheckList} onChange={onCheckBoxChange} key={Date().valueOf()}>
				<div className="course-all-tent">
					<ul>
						{
							dataSource.data.map((item, index) => {
								return (
									<li key={`par${index}`}>
										<div className="course-series">
											<div className="course-series-left">
												<span style={{ paddingRight: "12px" }}>
													<Checkbox onChange={onCheckAllChange} value={item.course_id}></Checkbox>
												</span>{item.title}
												<span className={item.topic !== "0" ? "courseon" : ""}></span></div>
											<button className="cs-ser-on cs-ser-showon">展开</button>
										</div>
										<div className="course-series-nr">
											<Checkbox.Group style={{ width: "100%" }} defaultValue={defaultCheckList} onChange={onCheckBoxChange} key={Date().valueOf()}>
												{
													item.children.map((child, indexc) => {
														return (
															<div className="series-nr-list" key={`par${indexc}`}>
																<p className="srsnr-rt">
																	<span style={{ paddingRight: "12px" }}>
																		<Checkbox onChange={onCheckAllChange} value={child.course_id}></Checkbox></span>
																	<Link to={{ pathname: '/agent/courseDetail/' + child.user_course_id }}>{child.title}</Link></p>
																<span className="srsnr-lf">最低学习时间：{formatSeconds(child.min_long)}</span>
															</div>
														)
													})
												}
											</Checkbox.Group>
										</div>
									</li>
								)
							})
						}
					</ul>
				</div>
			</Checkbox.Group>
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