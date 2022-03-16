import React from "react";
import { Pagination } from 'antd';

import './snlistsingle.css'

const SnListsingle = () => {

    return (
        <>
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
                <div className="list-page">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </>
    )
}
export default SnListsingle