import React, { useState }  from 'react'
import { Link } from 'react-router-dom';
import { Pagination, Select, Input, Space } from 'antd';
import Query from '../../components/query/Query';
import "./index.scss"
const { Option } = Select;
function DigitalLIst() {
    const [displayWay, setDisplayWay] = useState("grid") // grid list
    const handleDisplayWay = (val)=>{
        alert(val)
        setDisplayWay(val)
    }
    return (
        <>
            {/* Banner */}
            <div className="subpage-banner">
                <div className="subpage-tent">
                    <div className="subpage-tle">Digital Assets</div>
                    <div className="subpage-rln">当前位置：<span className="subpage-index"><Link to="/agent/dashboard">首页</Link></span> - 案例</div>
                </div>
            </div>

            <Query handleDisplayWay={ handleDisplayWay} >组件分类名称</Query>

            {/* 数据列表 */}
            <div className="snlist-box">
                <div className="snlist-list">
                    <ul className="snlist-ul">
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                    </ul>
                </div>

                {/* 列表视图 */}
                <div className="snltsgle-box">
                    <div className="snltsgle-list">
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
                                <tr>
                                    <td className="tb-td-color01 th-with01"><span className="td-pc td-pctest">展会名称ABCDEF</span></td>
                                    <td className="tb-td-color01 th-with02">RAISE3D</td>
                                    <td className="tb-td-color01 th-with03"><span>PDF</span></td>
                                    <td className="tb-td-color01 th-with04">16mb</td>
                                    <td className="tb-td-color02 th-with05">2021-01-10 04:21</td>
                                    <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionof">加入收藏</span></td>
                                </tr>
                                <tr>
                                    <td className="tb-td-color01 th-with01"><span className="td-pc td-pcvedio">展会名称ABCDEF</span></td>
                                    <td className="tb-td-color01 th-with02">RAISE3D</td>
                                    <td className="tb-td-color01 th-with03"><span>PDF</span></td>
                                    <td className="tb-td-color01 th-with04">16mb</td>
                                    <td className="tb-td-color02 th-with05">2021-01-10 04:21</td>
                                    <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionon">加入收藏</span></td>
                                </tr>
                                <tr>
                                    <td className="tb-td-color01 th-with01"><span className="td-pc td-pctest">展会名称ABCDEF</span></td>
                                    <td className="tb-td-color01 th-with02">RAISE3D</td>
                                    <td className="tb-td-color01 th-with03"><span>PDF</span></td>
                                    <td className="tb-td-color01 th-with04">16mb</td>
                                    <td className="tb-td-color02 th-with05">2021-01-10 04:21</td>
                                    <td className="tb-td-color03 th-with06"><span className="td-collection td-collectionof">加入收藏</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
                <div className="list-page">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </>

    )
}

export default DigitalLIst