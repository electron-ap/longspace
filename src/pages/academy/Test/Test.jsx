import React from 'react'
import { Radio } from 'antd';
import { Link } from 'react-router-dom';
import { Pagination, Input } from 'antd';

import "./index.scss"
import Single from './components/Single';
import Multi from './components/Multi';
import MultiImg from './components/MultiImg';
import ShowCheck from './components/ShowCheck';
import Result from './components/Result';

function Test() {
    
    return (
        <div className="course-all">
            {/* 考试单选题 */}
            <div className="exam-title">
                <div className="exam-title-left">考试进度(<span>3/25</span>)</div>
                <div className="exam-title-right">
                    <span className="coun-down">倒计时 03:50</span>
                </div>
            </div>
            <div className="option-questions-tle">
                <span>3.</span>
                <span className="single-choice">【单选题】</span>
                <span>3D打印机的操作分为几个步骤？（3分）</span>
            </div>
            
            
            <Single></Single>
            <Multi></Multi>
            <MultiImg></MultiImg>

            <button className="singlechoice-skip">跳过</button>
            <button className="singlechoice-sign">标记</button>


            <ShowCheck></ShowCheck>
            <Result></Result>

            <button className="singlechoice-submit">确定</button>

        </div>
    )
}

export default Test