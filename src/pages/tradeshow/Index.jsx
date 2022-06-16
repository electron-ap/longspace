import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Select, Input, Checkbox, message } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import Query from '../../components/query/Query';
import "./index.scss"
import { moduleBasic, moduleDataList, isFavorites, downloadFileZip } from "../../libs/api"
import { downLoadFile } from "../../libs/utils/function"
import { useLangContext } from '../../libs/utils/context'

const { Option } = Select;

function Index(props) {
    let _language = localStorage.getItem('language') || 'zh-cn';
    const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

    const { nav_id } = props.location.state
    const [pageSource, setPageSource] = useState({total: 0})
    const [dataSource, setDataSource] = useState([])
    const [pagination, setPagination] = useState({ current: 1, pageSize: 16 })
    const [sortWay, setSortWay] = useState(1) // 默认降序
    const [displayWay, setDisplayWay] = useState("grid") // grid list
    const [navInfo, setNavInfo] = useState({})
    const [formParams, setFormParams] = useState([])
    const [formQuery, setFormQuery] = useState({})
    const [checkAll, setCheckAll] = useState(false)

    useEffect(() => {
        getBasic()
    }, [])
    useEffect(() => {
        getDataSource()
    }, [pagination, formQuery])

    // Banner图及筛选条件
    const getBasic = () => {
        moduleBasic({ nav_id }).then(res => {
            if (res.code === 200) {
                setNavInfo({ title: res.data.title, banner: res.data.banner })
                setFormParams(res.data.search_key)
            }
        }).catch(err => { })
    }
    const getDataSource = () => {
        moduleDataList({ ...formQuery, nav_id, page: pagination.current, limit: pagination.pageSize, order: sortWay }).then(res => {
            if (res.code === 200) {
                let _data = res.data
                _data.forEach((item,index)=>{
                    _data[index].checked = false;
                })

                setPageSource({ total: res.count })

                setDataSource(_data)
            }
        }).catch(err => { })
    }
    const onPageChange = (val) => {
        setPagination({ ...pagination, current: val })
    }
    const handleSort = (sort) => {
        setSortWay(sort)
        getDataSource()
    }

    const handleDisplayWay = (val) => {
        setDisplayWay(val)
    }
    const handleFormQuery = (obj) => {
        setFormQuery({ ...obj })
    }

    const doFavorites = (val) => {
        isFavorites({ file_id: val }).then(res => {
            if (res.code === 204) {
                getDataSource()
            }
            message.info(res.msg)
        }).catch(err => { })
    }

    // 全选或反选
    const onCheckChange = (e) => {
        setCheckAll(e.target.checked)
        console.log(e.target.checked)
        let mydata = dataSource
        mydata.forEach((item,index) => {
            mydata[index].checked = e.target.checked
        })
        setDataSource([...mydata])
    }
    const onItemChange = (index) =>{
        let mydata = dataSource
        mydata[index].checked = !mydata[index].checked
        setDataSource([...mydata])
    }

    const handleDownLoad = () => {
        let mydata = dataSource
        let _len = 0
        let _file_id = [];
        mydata.forEach((item,index) => {
            if(mydata[index].checked){
                _len += 1
                _file_id.push(item.file_id)
            }
        })
        if (_len === 0) {
            message.error("请选择要下载的文件");
            return false;
        }
        downloadFileZip({ file: JSON.stringify(_file_id) }).then(res => {
            if (res.code === 200) {
                downLoadFile(res.data.path)
            }
            message.info(res.msg);
        }).catch(err => { })
    }

    const listFileType = (item) => {
        if (["PNG", 'JPG', 'JPEG', 'GIF'].includes(item.type)) {
            return (<span className="td-pc td-pcimg"><Link to={`/fileDetail/?type=${item.type}&url=${item.url}`} target="_blank" title={item.file_name}>{item.file_name}</Link></span>)
        } else if (["MP4"].includes(item.type)) {
            return (<span className="td-pc td-pcvedio"><Link to={`/fileDetail/?type=${item.type}&url=${item.url}`} target="_blank" title={item.file_name}>{item.file_name}</Link></span>)
        } else {
            return (<span className="td-pc td-pctest"><Link to={`/fileDetail/?type=${item.type}&url=${item.url}`} target="_blank" title={item.file_name}>{item.file_name}</Link></span>)
        }

    }

    const renderGridItem = (item,index) => {
        if (["XLSX", "XLS", 'DOC', 'DOCX'].includes(item.type)) {
            return (<li className="list-sntems" key={item.file_id}>
                {
                    item.is_favorites === 1 ? <span style={{position:"absolute", left:"10px",top:"10px",zIndex:100}} className="td-collection td-collectionon" onClick={() => doFavorites(item.file_id)}>&nbsp;</span> : <span style={{position:"absolute", left:"10px",top:"10px",zIndex:100}} className="td-collection td-collectionof" onClick={() => doFavorites(item.file_id)}>&nbsp;</span>
                }
                <div className="list-box">
                    <a href={item.url} target="_blank" rel="noreferrer" title={item.file_name}><img className="list-img" title={item.file_name} src={item.cover} alt="" />
                    </a>
                    <span className="list-pdf">{item.type}</span>
                </div>
                <div className="snlist-title"><Checkbox onChange={()=>onItemChange(index)} checked={item.checked}></Checkbox> &nbsp;<span className="snlist-title-pc pctest"></span>{item.file_name}
                <div style={{float:"right"}}>
                {
                    item.is_favorites === 1 ? <span className="td-collection td-collectionon" onClick={() => doFavorites(item.file_id)}>&nbsp;</span> : <span className="td-collection td-collectionof" onClick={() => doFavorites(item.file_id)}>&nbsp;</span>
                }</div>
                </div>
            </li>)
        } else {
            return (<li className="list-sntems" key={item.file_id}>
                {
                    item.is_favorites === 1 ? <span style={{position:"absolute", left:"10px",top:"10px",zIndex:100}} className="td-collection td-collectionon" onClick={() => doFavorites(item.file_id)}>&nbsp;</span> : <span style={{position:"absolute", left:"10px",top:"10px",zIndex:100}} className="td-collection td-collectionof" onClick={() => doFavorites(item.file_id)}>&nbsp;</span>
                }

                <div className="list-box">
                    <Link to={`/fileDetail/?type=${item.type}&url=${item.url}`} target="_blank" title={item.file_name}><img className="list-img" src={item.cover} alt="" />
                    </Link>
                    <span className="list-pdf">{item.type}</span>
                </div>
                <div className="snlist-title" title={item.file_name}><Checkbox onChange={()=>onItemChange(index)} checked={item.checked}></Checkbox> &nbsp;<span className="snlist-title-pc pctest"></span>{item.file_name}
                <div style={{float:"right"}}>
                {
                    item.is_favorites === 1 ? <span className="td-collection td-collectionon" onClick={() => doFavorites(item.file_id)}>&nbsp;</span> : <span className="td-collection td-collectionof" onClick={() => doFavorites(item.file_id)}>&nbsp;</span>
                }</div>
                </div>
            </li>)
        }
    }

    const calcFileSize = (val) => {
        let size = Math.round(val / 1024 * 100) / 100
        // if(size>=1024){
        //     size = Math.round(size/1024*100)/100   
        //     return size+"MB"
        // }
        return size + "MB"
    }
    return (
        <>
            {/* Banner */}
            <div className="subpage-banner" style={{ backgroundImage: `url(${navInfo.banner})`, backgroundSize: "100% 100%" }}>
                <div className="subpage-tent">
                    <div className="subpage-tle">{langConfig.n_digital_trade}</div>
                    <div className="subpage-rln">{langConfig.postion}：<span className="subpage-index"><Link to="/agent/dashboard" className='a-white'>{langConfig.home}</Link></span> - {navInfo.title}</div>
                </div>
            </div>

            <Query formParams={formParams} handleDisplayWay={handleDisplayWay} handleFormQuery={handleFormQuery} >{navInfo.title}</Query>


            <div className="snlist-box">
                <div className='table-info-title'>
                    <div className='info-title-count'>{langConfig.total} <span>{pageSource.total}</span></div>
                    <div className='info-title-sort' >
                        {langConfig.d_sort_time} {sortWay === 1 ? <ArrowUpOutlined onClick={() => handleSort(2)} /> : <ArrowDownOutlined onClick={() => handleSort(1)} />}
                    </div>
                    <div className='info-title-down'>
                        <Checkbox onChange={onCheckChange} checked={checkAll}></Checkbox> &nbsp;<img src='../../assets/screen/dload.png' alt='' /> <span style={{ cursor: "pointer" }} onClick={handleDownLoad}>{langConfig.c_download}</span>
                    </div>
                </div>
                
                <div className="snlist-list">
                    {
                        displayWay === "grid" ? (
                            <ul className="snlist-ul">
                                {
                                    dataSource.map((item,index) => {
                                        return (
                                            renderGridItem(item,index)
                                        )
                                    })
                                }
                            </ul>
                        ) : (
                            <>
                                <table className="snltsgle-table">
                                    <thead className="snltsgle-thead">
                                        <tr>
                                            <th className="th-with01">{langConfig.digital_title}</th>
                                            <th className="th-with02">{langConfig.digital_publish}</th>
                                            <th className="th-with03">{langConfig.digital_file_type}</th>
                                            <th className="th-with04">{langConfig.digital_file_size}</th>
                                            <th className="th-with05">{langConfig.digital_upload_time}</th>
                                            <th className="th-with06"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="tb-td-border">
                                        {
                                            dataSource.map((item,index) => {
                                                return (
                                                    <tr key={item.file_id}>
                                                        <td className="tb-td-color01 th-with01">
                                                            <Checkbox  onChange={()=>onItemChange(index)} checked={item.checked}></Checkbox> &nbsp;{listFileType(item)}</td>
                                                        <td className="tb-td-color01 th-with02">RAISE3D</td>
                                                        <td className="tb-td-color01 th-with03"><span>{item.type}</span></td>
                                                        <td className="tb-td-color01 th-with04">{
                                                            calcFileSize(item.size)
                                                        }
                                                        </td>
                                                        <td className="tb-td-color02 th-with05">{item.create_time}</td>
                                                        {
                                                            item.is_favorites === 1 ? <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionon" onClick={() => doFavorites(item.file_id)}>{langConfig.d_remove_fav}</span></td> : <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionof" onClick={() => doFavorites(item.file_id)}>{langConfig.d_add_fav}</span></td>
                                                        }
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </>
                        )
                    }
                </div>

                <div className="list-page">
                    <Pagination
                        size="small"
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pageSource.total}
                        onChange={val => onPageChange(val)}
                    />
                </div>
            </div>
        </>

    )
}
export default Index