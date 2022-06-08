import React, { useEffect, useState, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { UpOutlined,DownOutlined } from '@ant-design/icons';
import { Pagination, Input, Checkbox, Tree } from 'antd';
import "../index.scss"
import { courseList, memberCourseList, memberCourseOnOff } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
import { useLangContext } from '../../../libs/utils/context'
import { message } from 'antd';
const { Search } = Input;
function Course(props) {
	console.log("course props", props)
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
	const paramsKey = useRef(null);
	const { setLang, langConfig } = useLangContext();
	useEffect(() => {
		setLang(lang)
	}, [lang])

	const [agentAdmin, setAgentAdmin] = useState(false);
	const [keyword, setKeyword] = useState('');
	let userId = props.match.params.user_id || ""
	// let _state = props.location.state || { keyword: '' }
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })

	useEffect(() => {
		paramsKey.current = props.location.state?.keyword 
	}, [props.location.state])

	useEffect(() => {
		paramsKey.current = keyword
	}, [keyword])

	useEffect(() => {
		getDataSource()
	}, [pagination, keyword, props.location.state])

	useEffect(() => {
		if (userId && localStorage.getItem("userType") === "1") {
			setAgentAdmin(true)
		}
		// console.log("_state", _state)
		// setKeyword(_state.keyword)
		setPagination({ ...pagination, current: 1 })
	}, [])


	const getDataSource = () => {

		if (userId && localStorage.getItem("userType") === "1") {
			memberCourseList({ page: pagination.current, limit: pagination.pageSize, user_id: userId }).then(res => {
				if (res.code === 200) {
					let _data = res.data;
					_data.forEach((item,index)=>{
						_data[index].openStatus = false;
					})
					// console.log("_data",_data);
					setDataSource({ data: _data, total: res.count })
				}
			}).catch(err => { })
		} else {
			courseList({ status: 1, page: pagination.current, limit: pagination.pageSize, keyword: paramsKey.current }).then(res => {
				if (res.code === 200) {
					let _data = res.data;
					_data.forEach((item,index)=>{
						_data[index].openStatus = false;
					})
					setDataSource({ data: _data, total: res.count })
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

	const [onOffStatus, setOnOffStatus] = useState(1) // 开放关闭课程

	// 全选
	const onCheckAllChange = (e) => {
		let _data = dataSource.data;
		let _son_data = [];
		_data.forEach((item, index) => {
			_data[index].is_add = e.target.checked ? 1 : 0;
			_son_data = item.children
			if (_son_data.length > 0) {
				_son_data.forEach((itemson, indexson) => {
					_son_data[indexson].is_add = e.target.checked ? 1 : 0;
				})
			}
			_data[index].children = _son_data;
		})
		setDataSource({ data: _data })
	}
	const onParItemCheckChange = (e, val) => {
		console.log("onParItemCheckChange", e, val)
		let _data = dataSource.data;
		let _son_data = [];
		_data.forEach((item, index) => {
			if (item.course_id === val) {
				_data[index].is_add = e.target.checked ? 1 : 0;
				_son_data = item.children
				if (_son_data.length > 0) {
					_son_data.forEach((itemson, indexson) => {
						_son_data[indexson].is_add = e.target.checked ? 1 : 0;
					})
				}
				_data[index].children = _son_data;
			}
		})
		setDataSource({ data: _data })
	}
	const onSonItemCheckChange = (e, val) => {
		let _data = dataSource.data;
		let _son_data = [];
		let _son_checked_len = 0;
		_data.forEach((item, index) => {
			_son_data = item.children
			_son_data.forEach((itemson, indexson) => {
				if (itemson.course_id === val) {
					_son_data[indexson].is_add = e.target.checked ? 1 : 0;
				}
			})
			_data[index].children = _son_data;
			if (_son_data.length > 0) {
				_son_data.forEach((itemson, indexson) => {
					if (itemson.is_add) {
						_son_checked_len += 1;
					}
				})
				_data[index].is_add = _son_data.length === _son_checked_len ? true : false
			}

			_son_checked_len = 0;
		})
		setDataSource({ data: _data })
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
		let course_id_arr = [];
		let _data = dataSource.data;
		let _son_data = [];
		_data.forEach((item) => {
			if (item.is_add) {
				course_id_arr.push(item.course_id)
				_son_data = item.children
				if (_son_data.length > 0) {
					_son_data.forEach((itemson) => {
						if (itemson.is_add) {
							course_id_arr.push(itemson.course_id)
						}
					})
				}
			}
		})

		memberCourseOnOff({ user_id: userId, course: JSON.stringify(course_id_arr), status: onOffStatus }).then(res => {
			if(res.code === 204){
				message.success(res.msg)
			}else{
				message.error(res.msg)
			}
		}).catch(err => {

		})
	}

	// 展开，收起 子项
	const handleItemOpenClose = (index) => {
		let _data = dataSource.data;
		_data.forEach((item,key) => {
			if (key === index) {
				_data[key].openStatus = !_data[key].openStatus
			}
		})
		setDataSource({ data: _data })
	}

	return (
		<div className="course-all">
			<div className="course-search">
				<div className="cs-search-left"> {langConfig.all_course} </div>
				<div className="cs-search-right">
					<Search placeholder={langConfig.search_text} onSearch={onSearch} enterButton />
				</div>
			</div>
			{
				agentAdmin ? (<div className='auth-course-box'>
					<div className='chk-box'><Checkbox onChange={onCheckAllChange}><span>{langConfig.check_all}</span></Checkbox></div>
					<div className='auth-btn' style={{ color: "#0150C8" }} onClick={openCourse}>{langConfig.open_course}</div>
					<div className='auth-btn' style={{ color: "#C30D23" }} onClick={closeCourse}>{langConfig.close_course}</div>
				</div>) : null
			}

			<div className="course-all-tent">
				<ul>
					{
						dataSource.data.map((item, index) => {
							return (
								<li key={`par${index}`}>
									<div className="course-series">
										<div className="course-series-left">
											<span style={{ paddingRight: "12px" }}>

												{
													agentAdmin ? (<Checkbox onChange={(e) => onParItemCheckChange(e, item.course_id)} checked={item.is_add ? true : false}></Checkbox>) : null
												}

											</span>{item.title}
											<span className={item.topic !== "0" ? "courseon" : ""}></span></div>

											{/* cs-ser-showon */}
										<button style={{ background: "#EBF4F8",color:"red",display:item.children.length>2?'block':'none'}} className="cs-ser-on " onClick={()=>handleItemOpenClose(index)}>{item.openStatus?langConfig.c_close_item:langConfig.c_open_item}
										&nbsp;
										{item.openStatus?<UpOutlined />:<DownOutlined />}
										</button>
									</div>
									<div className="course-series-nr">
										{
											item.children.map((child, indexc) => {
												return (
													<div style={{display:!item.openStatus?"none":"block"}}  key={`par${indexc}`}>
													<div  className="series-nr-list">
														<p className="srsnr-rt">
															<span style={{ paddingRight: "12px" }}>
																{
																	agentAdmin ? (<Checkbox onChange={(e) => onSonItemCheckChange(e, child.course_id)} checked={child.is_add ? true : false}></Checkbox>) : null
																}
															</span>
															<Link to={{ pathname: '/agent/courseDetail/' + child.course_id }}>{child.title}</Link></p>
														<span className="srsnr-lf">{langConfig.c_min_study_time}：{formatSeconds(child.min_long)}</span>
													</div>
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