import React, { useCallback, useEffect, useRef, useState } from 'react'
import { examResult } from "../../../../libs/api"
import { message } from 'antd';

function Result(props) {
    console.log("result", props);
    const { topic } = props
    const modalRef = useRef(0);
    const [dataList, setDataList] = useState({}) // 试题列表
    const [dataItem, setDataItem] = useState({}) // 当前试题数据
    const [result, setResult] = useState({}) // 考试结果
    const [modalVisible, setModalVisible] = useState(false)
    const [curPaperNo, setCurPaperNo] = useState(1)
    useEffect(() => {
        examResult({ topic }).then(res => {
            let analysis = []
            res.data.analysis.forEach(item => {
                analysis.push({ ...item, trues: JSON.parse(item.trues), answer: JSON.parse(item.answer) })
            })

            setDataList(analysis)
            setResult({ result: res.data.result, score: res.data.score })
        }).catch(err => {

        })
    }, [])

    // 获取题目
    const getPaperData = (index) => {
        let _item = dataList[index - 1];
        setDataItem({ ..._item })
    }

    // 上一题
    const handlePre = () => {
        let _curPaperNo = curPaperNo - 1
        if (_curPaperNo > 1) {
            setCurPaperNo(_curPaperNo)
            getPaperData(_curPaperNo)
        } else {
            setCurPaperNo(1)
            message.info("已经是第一题了！")
        }

    }

    // 下一题
    const handleNext = () => {
        let _curPaperNo = curPaperNo + 1
        if (_curPaperNo <= dataList.length) {
            setCurPaperNo(_curPaperNo)
            getPaperData(_curPaperNo)
        } else {
            message.info("已经是最后一题了！")
        }
    }

    const showAnalysis = () => {
        modalRef.current = new Date().valueOf()
        getPaperData(1);
        setModalVisible(true)
    }

    const closeAnalysis = () => {
        setCurPaperNo(1)
        setModalVisible(false)
    }

    const examType = (index) => {
        let types = ['单选题', '多选题', '判断题']
        return types[index - 1];
    }

    const renderResult = () => {
        if (dataItem.type === 1 || dataItem.type === 2) {
            return (
                <>
                    <li className="result-items"> {/* result-items-right */}
                        <p className="result-items-p">A：{dataItem.option_a}</p>
                        {dataItem.option_a_img!==""?<img className="result-items-img" alt="" src={dataItem.option_a_img} />:''}
                    </li>
                    <li className="result-items">
                        <p className="result-items-p">B：{dataItem.option_b}</p>
                        {dataItem.option_b_img!==""?<img className="result-items-img" alt="" src={dataItem.option_b_img} />:''}
                    </li>
                    <li className="result-items">{/* result-items-wrong*/}
                        <p className="result-items-p">C：{dataItem.option_c}</p>
                        {dataItem.option_c_img!==""?<img className="result-items-img" alt="" src={dataItem.option_c_img} />:''}
                    </li>
                    <li className="result-items">
                        <p className="result-items-p">D：{dataItem.option_d}</p>
                        {dataItem.option_d_img!==""?<img className="result-items-img" alt="" src={dataItem.option_d_img} />:''}
                    </li>
                </>
            )
        }else if (dataItem.type === 3) {
            return (
                <>
                    <li className="result-items"> {/* result-items-right */}
                        <p className="result-items-p">E：{dataItem.option_a}</p>
                        {dataItem.option_a_img!==""?<img className="result-items-img" alt="" src={dataItem.option_a_img} />:''}
                    </li>
                    <li className="result-items">
                        <p className="result-items-p">F：{dataItem.option_b}</p>
                        {dataItem.option_b_img!==""?<img className="result-items-img" alt="" src={dataItem.option_b_img} />:''}
                    </li>
                </>
            )
        }
    }
    return (
        <>
            <div className="exam-result">
                <div className="exam-result-tle">{result.result === 1 ? '恭喜您，本次考试通过！' : '很遗憾，本次考试未通过！'}</div>
                <div className="exam-result-on">{result.score}分</div>
                <div className="exam-result-p">考试成绩</div>
                <div className="btn-exam-result-bg">
                    <button className="btn-exam-result" onClick={showAnalysis}>点击查看答案解析</button>
                </div>
            </div>
            {/* 弹窗地址  style={{display:"none"}} */}
            <div className="result-wraper" style={{ display: modalVisible ? "block" : "none" }}></div>
            <div className="result-box" style={{ display: modalVisible ? "block" : "none" }}>
                <div className="result-box-close" onClick={closeAnalysis}></div>
                <div className="result-nme">答案解析</div>
                <div className="result-title">考试进度(<span>{curPaperNo}/{dataList.length}</span>)</div>
                <div className="option-questions-tle">
                    <span>{curPaperNo}.</span>
                    <span className="single-choice">【{examType(dataItem.type)}】</span>
                    <span>{dataItem.question}（{dataItem.score}分）</span>
                </div>
                <ul className="result-subject">
                    {
                        renderResult()
                    }
                </ul>
                <div className="result-answer">您的答案：{dataItem.answer}  正确答案：{dataItem.trues}</div>
                <div className="result-answer-p">答案解析：{dataItem.analysis}</div>
                <button className="btn-answer btn-answer-left" onClick={handlePre}>上一题</button>
                <button className="btn-answer" onClick={handleNext}>下一题</button>
            </div>
        </>
    )
}

export default Result