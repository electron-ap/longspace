import React from "react";

import './index.css'


const Contents = () => {

    return (
        <>
            <div className="contents">
                <div className="contents-tle">Digital Assets</div>
                <div className="contents-nr">
                    <ul>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte01.png")} />
                            <span className="pcte-tle">3D打印机</span>
                        </li>

                    </ul>
                </div>
                <div className="contents-tle">Tradeshows</div>
                <div className="contents-nr">
                    <ul>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte11.png")} />
                            <span className="pcte-tle">Tradeshow Archive</span>
                        </li>
                    </ul>
                </div>
                <div className="contents-tle">Sales Partner Academy</div>
                <div className="contents-nr">
                    <ul>
                        <li>
                            <img className="pcte" alt="pcte01" src={require("../../../assets/pcte21.png")} />
                            <span className="pcte-tle">Sales Partner Academy</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Contents