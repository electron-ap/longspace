import React, { useEffect, useState } from 'react'
import { message, Pagination,Table} from 'antd';
import { examList,memberExamList,openTest } from "../../../libs/api"
import { useLangContext } from '../../../libs/utils/context'
import { formatSeconds } from "../../../libs/utils/function"

function Exam(props) {
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
			memberExamList({  page: pagination.current, limit: pagination.pageSize,user_id:userId }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		}else{
			examList({  page: pagination.current, limit: pagination.pageSize, }).then(res => {
				if (res.code === 200) {
					setDataSource({ data: res.data, total: res.count })
				}
			}).catch(err => { })
		}
		
	}
	const onPageChange = (val) => {
		setPagination({ ...pagination, current: val })
	}

	const reOpenExam = (topic_id) =>{
		openTest({ topic_id,user_id:userId }).then(res => {
			if (res.code === 204) {
				getDataSource();
				message.success(res.msg)
			}else{
				message.error(res.msg)
			}
			
		}).catch(err => { })
	}
	
	const columns = [
		{
			title: langConfig.c_exam,
			dataIndex: 'title',
			key: 'title',
			width: 220,

		},
		{
			title: langConfig.c_course_name,
			dataIndex: 'course',
			key: 'course',
			width: 220,
		},
		{
			title: langConfig.c_exam_time,
			dataIndex: 'start_time',
			key: 'start_time',
			width: 210,
		},
		{
			title: langConfig.c_exam_status,
			dataIndex: 'result',
			key: 'sresultize',
			width: 120,
			align: 'center',
			render: (text) => {
				if (text === 1) {
					return <div className="exam-passed">PASSED</div>
				} else if (text === 3) {
					return <div className="exam-failed">FAILED</div>
				}else{
					return <div className="exam-makeup">MAKE-UP</div>
				}
				
			}
		},
		{
			title: langConfig.c_make_up,
			dataIndex: 'remaining',
			key: 'remaining',
			align: 'center',
			render: (text,record) => {
				if(localStorage.getItem("userType") === "1"){
					if (record.remaining === 0) {
						return <div style={{color:"#C30D23",cursor:"pointer"}} onClick={()=>reOpenExam(record.topic_id)}>{langConfig.c_open_retest}</div>
					}else{
						return record.remaining
					}
				}else{
					return record.remaining
				}
			}
		},
		{
			title: langConfig.c_duration,
			dataIndex: 'how_long',
			key: 'how_long',
			render: (text,record) => {
				if(text || text > 0){
					return formatSeconds(text)
				}else{
					return "00:00:00"
				}
			}
		},
	];
	return (
		<div className="course-all">
			{/* 考试 */}
			<div className="study-in">
				<Table dataSource={dataSource.data} rowKey="topic_id" columns={columns} pagination={false} />
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

export default Exam