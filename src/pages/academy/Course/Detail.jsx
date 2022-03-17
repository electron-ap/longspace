import React from 'react'

function Detail() {
    return (
        <div className="course-box">
            <div className="course-title">
                <div className="course-tle-left">当前位置：<span>首页</span> - <span>Sales Partner Academy</span></div>
                <div className="course-tle-right">状态：<span>未学习</span></div>
            </div>
            <div className="course-tent">
                <div className="course-tent-left">
                    <div className="list-box">
                        <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                        <span className="list-pdf">PDF</span>
                    </div>
                    <div className="start-study">开始学习<span className="start-ibn"></span></div>
                </div>
                <div className="course-tent-right">
                    <div className="course-tent-tle">
                        <h1>3D打印机如何设置参数</h1>
                        <p>3D打印机是如何设置参数的，本次课程分为20小节，从打印机的开机启动、加工过程、打磨、输入等各个环节，详细的说明了打印机是如何</p>
                    </div>
                    <div className="course-tent-box">
                        <div className="csetent-box-tle">最短学习时间：<span>10min</span></div>
                        <div className="csetent-box-show">
                            <img className="list-img" src="/assets/screen/listimg01.png" alt="" />
                        </div>
                        <div className="csetent-box-back"><span className="csetent-back">返回上级</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail