import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Select, Input, Space } from 'antd';
import Query from '../../components/query/Query';
import "./index.scss"
import { moduleBasic, moduleDataList } from "../../libs/api"

const { Option } = Select;

function Channels(props) {
    const { nav_id } = props.location.state

    const [dataSource, setDataSource] = useState({
        data: [],
        total: 0
    })
    const [pagination, setPagination] = useState({ current: 1, pageSize: 15 })
    const [displayWay, setDisplayWay] = useState("grid") // grid list
    const [navInfo, setNavInfo] = useState({})
    const [formParams, setFormParams] = useState([])

    useEffect(() => {
        getBasic()
        getDataSource()
    }, [pagination])

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
        moduleDataList({ nav_id, page: pagination.current, limit: pagination.pageSize, }).then(res => {
            if (res.code === 200) {
                setDataSource({ data: res.data, total: res.data.count })
            }
        }).catch(err => { })
    }
    const onPageChange = (val) => {
        setPagination({ ...pagination, current: val })
    }

    const handleDisplayWay = (val) => {
        setDisplayWay(val)
    }


    return (
        <>
            {/* Banner */}
            <div className="subpage-banner" style={{ background: `url(${navInfo.banner}) no-repeat top center` }}>
                <div className="subpage-tent">
                    <div className="subpage-tle">Digital Assets</div>
                    <div className="subpage-rln">当前位置：<span className="subpage-index"><Link to="/agent/dashboard">首页</Link></span> - 案例</div>
                </div>
            </div>

            <Query handleDisplayWay={handleDisplayWay} >{navInfo.title}</Query>


            <div className="snlist-box">
                <div className="snlist-list">
                    {
                        displayWay === "grid" ? (
                            <ul className="snlist-ul">
                                {
                                    dataSource.data.map(item => {
                                        return (
                                            <li className="list-sntems" key={item.file_id}>
                                                <div className="list-box">
                                                    <img className="list-img" src={item.cover} alt="" />
                                                    <span className="list-pdf">{item.file_name}</span>
                                                </div>
                                                <p className="snlist-title"><span className="snlist-title-pc pctest"></span>{item.file_name}</p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        ) : (<table className="snltsgle-table">
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
                                                <td className="tb-td-color01 th-with01"><span className="td-pc td-pctest">展会名称ABCDEF</span></td>
                                                <td className="tb-td-color01 th-with02">RAISE3D</td>
                                                <td className="tb-td-color01 th-with03"><span>{item.file_name}</span></td>
                                                <td className="tb-td-color01 th-with04">{item.size}</td>
                                                <td className="tb-td-color02 th-with05">{item.create_time}</td>
                                                <td className="tb-td-color03 th-with06"><span className={item.is_favorites ===1 ?"td-collection td-collectionon":"td-collection td-collectionof"}>加入收藏</span></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>)
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