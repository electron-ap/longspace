import React from "react";
import { Pagination } from 'antd';

import './snlist.css'

const SnList = () => {

    return (
        <>
            <div className="snlist-box">
                <div className="snlist-list">
                    <ul className="snlist-ul">
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">PDF</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pctest"></span>3D打印机的型号</p>
                        </li>
                        <li className="list-sntems">
                            <div className="list-box">
                                <img className="list-img" src={require("../../../assets/screen/listimg01.png")} alt="" />
                                <span className="list-pdf">视频</span>
                            </div>
                            <p className="snlist-title"><span className="snlist-title-pc pcvedio"></span>3D打印机的型号</p>
                        </li>
                    </ul>
                </div>
                <div className="list-page">
                    <Pagination defaultCurrent={1} total={50} />
                </div>
            </div>
        </>
    )
}
export default SnList