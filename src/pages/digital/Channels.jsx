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

function Channels(props) {
    let _language = localStorage.getItem('language') || 'zh-cn';
    const [lang, changeLang] = useState(_language);
    const { setLang, langConfig } = useLangContext();
    useEffect(() => {
        setLang(lang)
    }, [lang])

    const { nav_id } = props.location.state

    const [dataSource, setDataSource] = useState({
        data: [],
        total: 0
    })
    const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
    const [displayWay, setDisplayWay] = useState("grid") // grid list
    const [navInfo, setNavInfo] = useState({})
    const [formParams, setFormParams] = useState([])
    const [formQuery, setFormQuery] = useState({})
    const [defaultCheckList, setDefaultCheckList] = useState([])

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
        moduleDataList({ nav_id, page: pagination.current, limit: pagination.pageSize, ...formQuery }).then(res => {
            if (res.code === 200) {
                setDataSource({ data: res.data, total: res.count })
            }
        }).catch(err => { })
    }
    const onPageChange = (val) => {
        setPagination({ ...pagination, current: val })
    }

    const handleDisplayWay = (val) => {
        setDisplayWay(val)
    }
    const handleFormQuery = (obj) => {
        setFormQuery({ ...obj })
        console.log("父组件中.handleFormQuery", obj)
    }

    const doFavorites = (val) => {
        isFavorites({ file_id: val }).then(res => {
            if (res.code === 204) {
                getDataSource()
            }
            message.info(res.msg)
        }).catch(err => { })
    }

    const onCheckChange = (e) => {
        if (e.target.checked) {
            let tmp_arr = [];
            dataSource.data.forEach(item => {
                tmp_arr.push(item.file_id)
            })
            setDefaultCheckList([...tmp_arr])
        } else {
            setDefaultCheckList([])
        }
    }
    const onCheckBoxChange = (val) => {
        console.log("onCheckBoxChange", val)
        setDefaultCheckList(val)
    }
    const handleDownLoad = () => {
        if (defaultCheckList.length === 0) {
            message.error("请选择要下载的文件");
            return false;
        }
        downloadFileZip({ file: JSON.stringify(defaultCheckList) }).then(res => {
            if (res.code === 200) {
                downLoadFile(res.data.path)
            }
            message.info(res.msg);
        }).catch(err => { })
    }

    const listFileType = (item) => {
        // if (["PNG", 'JPG', 'JPEG', 'GIF'].includes(item.type)) {
        //     return (<span className="td-pc td-pcimg"><a href={item.cover} target="_blank" rel="noreferrer">{item.file_name}</a></span>)
        // } else if (["MP4", "PDF"].includes(item.type)) {
        //     return (<span className="td-pc td-pcvedio"><Link to={`/fileDetail/?type=${item.type}&url=${item.url}`}  target="_blank">{item.file_name}</Link></span>)
        // } else {
        //     return (<span className="td-pc td-pctest"><a href={item.cover} target="_blank" rel="noreferrer">{item.file_name}</a></span>)
        // }
        return (<span className="td-pc td-pcvedio"><Link to={`/fileDetail/?type=${item.type}&url=${item.url}`} target="_blank">{item.file_name}</Link></span>)
    }

    const renderGridItem = (item) => {
        // if (["PDF", "MP4"].includes(item.type)) {
        //     return (<li className="list-sntems" key={item.file_id}>
        //         <div className="list-box">
        //             <Link to={`/fileDetail/?type=${item.type}&url=${item.url}`}  target="_blank"><img className="list-img" src={item.cover} alt="" />
        //             </Link>
        //             <span className="list-pdf">{item.type}</span>
        //         </div>
        //         <p className="snlist-title"><span className="snlist-title-pc pctest"></span>{item.file_name}</p>
        //     </li>)
        // } else {
        //     return (<li className="list-sntems" key={item.file_id}>
        //         <div className="list-box">
        //             <a href={item.cover} target="_blank" rel="noreferrer">
        //                 <img className="list-img" src={item.cover} alt="" />
        //             </a>
        //             <span className="list-pdf">{item.type}</span>
        //         </div>
        //         <p className="snlist-title"><span className="snlist-title-pc pctest"></span>{item.file_name}</p>
        //     </li>)
        // }

        return (<li className="list-sntems" key={item.file_id}>
            <div className="list-box">
                <Link to={`/fileDetail/?type=${item.type}&url=${item.url}`} target="_blank"><img className="list-img" src={item.cover} alt="" />
                </Link>
                <span className="list-pdf">{item.type}</span>
            </div>
            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>{item.file_name}</p>
        </li>)


    }
    return (
        <>
            {/* Banner */}
            <div className="subpage-banner" style={{ backgroundImage: `url(${navInfo.banner})`, backgroundSize: "100% 100%" }}>
                <div className="subpage-tent">
                    <div className="subpage-tle">Digital Assets</div>
                    <div className="subpage-rln">{langConfig.postion}：<span className="subpage-index"><Link to="/agent/dashboard" className='a-white'>{langConfig.home}</Link></span> - {navInfo.title}</div>
                </div>
            </div>

            <Query formParams={formParams} handleDisplayWay={handleDisplayWay} handleFormQuery={handleFormQuery} >{navInfo.title}</Query>


            <div className="snlist-box">
                <div className="snlist-list">
                    {
                        displayWay === "grid" ? (
                            <ul className="snlist-ul">
                                {
                                    dataSource.data.map(item => {
                                        return (
                                            renderGridItem(item)
                                        )
                                    })
                                }
                            </ul>
                        ) : (
                            <>
                                <div className='table-info-title'>
                                    <div className='info-title-count'>{langConfig.total} <span>{dataSource.total}</span></div>
                                    <div className='info-title-sort' >
                                        {/* 按时间排序 <ArrowUpOutlined /> <ArrowDownOutlined /> */}
                                    </div>
                                    <div className='info-title-down'>
                                        <Checkbox onChange={onCheckChange}></Checkbox> &nbsp;<img src='../../assets/screen/dload.png' alt='' /> <span style={{ cursor: "pointer" }} onClick={handleDownLoad}>DOWNLOAD</span>
                                    </div>
                                </div>

                                <Checkbox.Group style={{ width: "100%" }} defaultValue={defaultCheckList} onChange={onCheckBoxChange} key={Date().valueOf()}>
                                    <table className="snltsgle-table">
                                        <thead className="snltsgle-thead">
                                            <tr>
                                                <th className="th-with01">名称</th>
                                                <th className="th-with02">发布者</th>
                                                <th className="th-with03">文件类型</th>
                                                <th className="th-with04">大小</th>
                                                <th className="th-with05">上传时间</th>
                                                <th className="th-with06"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="tb-td-border">
                                            {
                                                dataSource.data.map(item => {
                                                    return (
                                                        <tr key={item.file_id}>
                                                            <td className="tb-td-color01 th-with01">
                                                                <Checkbox value={item.file_id}></Checkbox> &nbsp;{listFileType(item)}</td>
                                                            <td className="tb-td-color01 th-with02">RAISE3D</td>
                                                            <td className="tb-td-color01 th-with03"><span>{item.type}</span></td>
                                                            <td className="tb-td-color01 th-with04">{item.size}</td>
                                                            <td className="tb-td-color02 th-with05">{item.create_time}</td>
                                                            {
                                                                item.is_favorites === 1 ? <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionon" onClick={() => doFavorites(item.file_id)}>{langConfig.d_add_fav}</span></td> : <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionof" onClick={() => doFavorites(item.file_id)}>{langConfig.d_remove_fav}</span></td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </Checkbox.Group>
                            </>
                        )
                    }
                </div>

                <div className="list-page">
                    <Pagination
                        size="small"
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={dataSource.total}
                        onChange={val => onPageChange(val)}
                    />
                </div>
            </div>
        </>

    )
}

export default Channels