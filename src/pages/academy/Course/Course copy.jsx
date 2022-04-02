import React, { useEffect, useState } from 'react'
import { Link ,useLocation} from 'react-router-dom';
import { Pagination, Input,Checkbox } from 'antd';
import "../index.scss"
import { courseList } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"
const { Search } = Input;
function Course(props) {	
	const [keyword,setKeyword] = useState("");
	// const { state={}} =useLocation()
	console.log("course props",props)
	
	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination,keyword])

	// useEffect(() => {
	// 	if(!!state && state.keyword){
	// 		setKeyword(state.keyword)
	// 	}
	// }, [])

	const getDataSource = () => {
		courseList({ status: 1, page: pagination.current, limit: pagination.pageSize,keyword }).then(res => {
			if (res.code === 200) {
				setDataSource({ data: res.data, total: res.count })
			}
		}).catch(err => { })
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

	const onSearch = value => {
		setKeyword(value)
		setPagination({...pagination,current:1})
	};

	const onCheckAllChange = (val) =>{

	}
	const openCourse = () =>{

	}
	const closeCourse = () =>{

	}
	
	return (
		<div className="course-all">
			<div className="course-search">
				<div className="cs-search-left">全部课程</div>
				<div className="cs-search-right">
					<Search placeholder="搜索课程" onSearch={onSearch} enterButton />
				</div>
			</div>
			<div className='auth-course-box'>
				<div className='chk-box'><Checkbox onChange={onCheckAllChange}><span>全选</span></Checkbox></div>
				<div className='auth-btn' style={{ color:"#0150C8"}} onClick={openCourse}>开放课程</div>
				<div className='auth-btn' style={{ color:"#C30D23"}} onClick={closeCourse}>关闭课程</div>
			</div>
			<div className="course-all-tent">
				<ul>
					{
						dataSource.data.map((item,index) => {
							return (
								<li key={`par${index}`}>
									<div className="course-series">
										<div className="course-series-left">
											<span style={{paddingRight:"12px"}}><Checkbox onChange={onCheckAllChange}></Checkbox></span>{item.title}
											<span className={item.topic !=="0"?"courseon":""}></span></div>
										<button className="cs-ser-on cs-ser-showon">展开</button>
									</div>
									<div className="course-series-nr">

										{
											item.children.map((child,indexc) => {
												return (
													<div className="series-nr-list" key={`par${indexc}`}>
														<p className="srsnr-rt">
														<span style={{paddingRight:"12px"}}><Checkbox onChange={onCheckAllChange}></Checkbox></span>
														<Link to={{pathname:'/agent/courseDetail/'+child.user_course_id}}>{child.title}</Link></p>
														<span className="srsnr-lf">最低学习时间：{formatSeconds(child.min_long)}</span>
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