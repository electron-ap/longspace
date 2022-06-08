import React,{useEffect,useState,useRef} from 'react'
import { Link, useLocation } from 'react-router-dom';
import { message } from 'antd';
import "./index.scss"
import Account from './Account';
import Favorites from './Favorites';
import Staff from './Staff';
import { userInfo,uploadFile } from "../../libs/api"
import { useLangContext } from '../../libs/utils/context'

function Index(props) {
	let _language = localStorage.getItem('language') || 'zh-cn';
	const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

    const refDom = useRef(null);
	const handleFileUpload = () => {
		refDom.current.click();
	}
	const fileUploadChange = (event) => {
        event.preventDefault()
        const {state,category_id} = props;
		let allFiles = event.target.files
		Object.keys(allFiles).forEach((key) => {
			console.log("allFiles[key]",allFiles[key])
			if(state === 1){
				if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(allFiles[key].name)) {
					message.error("头像必须是图片");
					return false;
				}
			}
		})
		
		let fd;
		Object.keys(allFiles).forEach((key) => {
			fd = new FormData()
			fd.append("file", allFiles[key]);
			fd.append("state", state);
			fd.append("key", key);
			fd.append("category_id", category_id);
			uploadFile(fd).then(res => {
				if(res.code === 200){
					getUserInfo()
				}else{
					message.error(res.msg)
				}
			})
		})
		
	}

	const { state = { tabIndex: 0 } } = useLocation();
	const [memberInfo,setMemberInfo] = useState({})
	const [tabActiveKey,setTabActiveKey] = useState(0)
	const [tabtitle,setTabTitle] = useState([])

	useEffect(()=>{
		setTabActiveKey(state.tabIndex)
    },[state])

	useEffect(()=>{
        getUserInfo()
    },[])

	const getUserInfo = ()=>{
		userInfo().then(res=>{
            if(res.code === 200 ){
                setMemberInfo({...res.data,head:res.data.head+`?${new Date().valueOf()}`})
				if(res.data.type === 1){
					setTabTitle([
						{ type: 1, title: langConfig.account_info },
						{ type: 2, title: langConfig.favorites },
						{ type: 3, title: langConfig.account_staff },
					])
				}else{
					setTabTitle([
						{ type: 1, title: langConfig.account_info },
						{ type: 2, title: langConfig.favorites },
					])
				}
            }
        }).catch(err=>{})
	}

	const handleTabClick = (index) =>{
		setTabActiveKey(index)
	}
	
	// 渲染目标组件
    const tabTarget = () => {
        let _tabActiveKey = parseInt(tabActiveKey)
        if (_tabActiveKey === 0) {
            return <Account memberInfo={memberInfo}/>
        } else if (_tabActiveKey === 1) {
            return <Favorites memberInfo={memberInfo} />
        } else if (_tabActiveKey === 2) {
            return <Staff memberInfo={memberInfo} />
        }
    }
	return (
		<>
			<div style={{
				width: '100%',
				height: '240px',
				background: 'url(/assets/cs-baner.png) no-repeat center center fixed',
				backgroundSize: 'cover',
			}} className="admined-banner">
				<div className="admined-tent">
					<div className="admined-rln">{langConfig.postion}：<span className="admined-index"><Link to="/agent/dashboard" className='a-white'>{langConfig.home}</Link></span> - <span>{langConfig.personal}</span></div>
				</div>
			</div>
			<div className="admin-wraper">
				<div className="admin-head">
				<input ref={refDom} type="file" name='fileUpload' id="fileUpload" onChange={fileUploadChange} style={{display: "none"}} />
					<div className="admin-head-pc" style={{cursor:"pointer"}} onClick={ handleFileUpload}>
						<img src={memberInfo.head} alt="" style={{width: "126px",
    height: '126px',borderRadius:"50%"}} />
					</div>
					<div className="admin-head-upload" style={{cursor:"pointer"}} onClick={ handleFileUpload}></div>
					<div className="admin-head-name">{memberInfo.account}</div>
				</div>
				<div className="admin-sort">
					<ul className="admin-sort-ul">
						{
							tabtitle.map((item,index)=>{
								return <li className={tabActiveKey === index?"sort-li sort-li-active":"sort-li"} key={index} onClick={()=>{handleTabClick(index)}}>{item.title}</li>
							})
						}
					</ul>
				</div>

				<div className="admin-sort-tent member-body-height">
					{tabTarget()}

				</div>

			</div>
		</>
	)
}

export default Index