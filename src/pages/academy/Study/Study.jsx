import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
// import { Pagination, Input } from 'antd';
import "../index.scss"
import { courseList,memberCourseList } from "../../../libs/api"
import { useLangContext } from '../../../libs/utils/context'
import { formatSeconds } from "../../../libs/utils/function"
import { Table } from 'antd';

function Study(props) {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
	const { setLang, langConfig } = useLangContext();
	useEffect(() => {
		setLang(lang)
	}, [lang])

	let userId = props.match.params.user_id || ""

	const [dataSource, setDataSource] = useState({
		data: [],
		total: 0
	})
	const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
	useEffect(() => {
		getDataSource()
	}, [pagination])

	const getDataSource = () => {
		if (userId && localStorage.getItem("userType") === "1") {
			memberCourseList({status: 2, page: pagination.current, limit: pagination.pageSize, user_id: userId }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		} else {
			courseList({ status: 2, page: pagination.current, limit: pagination.pageSize, }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		}

		
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

	const columns = [
		{
			title: langConfig.c_course_name,
			dataIndex: 'title',
			key: 'title',
			render: (text,record) => {
				console.log(text,record)
				if(record.children.length > 0){
					return text
				}else{
					return <Link to={{ pathname: '/agent/courseDetail/' + record.course_id }}>{record.title}</Link>
				}
				
			}
		},
		{
			title: langConfig.c_min_study_time,
			dataIndex: 'min_long',
			key: 'min_long',
			render: (text,record) => {
				if(record.children.length == 0){
					if(text || text > 0){
						return formatSeconds(text)
					}else{
						return "00:00:00"
					}
				}
			}
		},
		{
			title: langConfig.c_studyed_time,
			dataIndex: 'study_time',
			key: 'study_time',
			render: (text,record) => {
				if(record.children.length == 0){
					if(text || text > 0){
						return formatSeconds(text)
					}else{
						return "00:00:00"
					}
				}
			}
		},
		// formatSeconds
		{
			title: langConfig.c_close_date,
			dataIndex: 'end_time',
			key: 'end_time',
		},
		{
			title: langConfig.c_enter_test,
			dataIndex: 'uploadtime',
			key: 'uploadtime',

		},

	];
	return (
		<div className="course-all">
			{/* 学习中 */}
			<div className="study-in">
				<Table dataSource={dataSource.data} rowKey="user_course_id" columns={columns} />
			</div>
		</div>
	)
}

export default Study