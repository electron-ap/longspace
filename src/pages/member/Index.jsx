import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import "./index.scss"
import Account from './Account';
import Favorites from './Favorites';
import Staff from './Staff';
import { userInfo } from "../../libs/api"
function Index(props) {
	const [memberInfo,setMemberInfo] = useState({})
	const [tabActiveKey,setTabActiveKey] = useState(0)
	const [tabtitle,setTabTitle] = useState([])

	useEffect(()=>{
        userInfo().then(res=>{
            if(res.code === 200 ){
                setMemberInfo(res.data)
				if(res.data.type === 1){
					setTabTitle([
						{ type: 1, title: '账号信息' },
						{ type: 2, title: '收藏夹' },
						{ type: 3, title: '我的成员' },
					])
				}else{
					setTabTitle([
						{ type: 1, title: '账号信息' },
						{ type: 2, title: '收藏夹' },
					])
				}
            }
        }).catch(err=>{})
    },[])
	useEffect(()=>{
		setTabActiveKey(props.location.state.tabIndex)
    },[props.location.state.tabIndex])
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
					<div className="admined-rln">当前位置：<span className="admined-index"><Link to="/agent/dashboard">首页</Link></span> - <span>个人中心</span></div>
				</div>
			</div>
			<div className="admin-wraper">
				<div className="admin-head">
					<div className="admin-head-pc"></div>
					<div className="admin-head-upload"></div>
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