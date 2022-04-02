import React, { useEffect,useState,useRef } from 'react'
import { Radio, Checkbox, Row, Col, message } from 'antd';
import Single from './Single';
import Multi from './Multi';
import MultiImg from './MultiImg';
import Judge from './Judge';
import {  examPreNext, examSubmit } from "../../../../libs/api"
function ShowCheck(props) {
    const { res } = props

    const [questionList, setQuestionList] = useState(res) // 所有试题集合 // 1 正常答题  2：标记  3：跳过

    

    const itemKey = useRef(0);
    const [modalVisible, setModalVisible] = useState(false)
    const [dataItem, setDataItem] = useState({}) // 当前试题数据
    const [dataIndex, setDataIndex] = useState(0) 
    const [answer, setAnswer] = useState([]) // 答案

    const showModal = (index) =>{
        setDataIndex(index)
        getQuestion(index)
        setModalVisible(true)
    }

    const closeModal = () =>{
        setModalVisible(false)
    }

    // 获取当前题
    const getQuestion = (index) => {
        examPreNext({ next: index+1 }).then(res => {
            if (res.code === "200") {
                itemKey.current = new Date().valueOf()
                setDataItem(res.data)
            }
        }).catch(err => { })
    }

    // 提交试卷
    const submitPaper = () => {
        examSubmit({ order: dataIndex+1, answer: JSON.stringify(answer), mark:1 }).then(res => {
            if (res.code === 204) {
                setQuestionList(prev => {
                    prev[dataIndex] = {
                        ...prev[dataIndex],
                        result: 1,
                    }
                    return [...prev]
                })
                setModalVisible(false)
            }
            message.info(res.msg)
        }).catch(err => { })
    }

    const showPaperItem = () => {
        if (dataItem.type === 1) {
            return <Single key={itemKey.current} item={dataItem} handlepaperitem={handleSingle}></Single>
        } else if (dataItem.type === 2) {
            if (dataItem.option_a_img === "") {
                return <Multi key={itemKey.current} item={dataItem} handlepaperitem={handleMulti}></Multi>
            } else {
                return <MultiImg key={itemKey.current} item={dataItem} handlepaperitem={handleMultiImg}></MultiImg>
            }
        } else if (dataItem.type === 3) {
            return <Judge key={itemKey.current} item={dataItem} handlepaperitem={handleSingle}></Judge>
        }
    }
    const handleSingle = (val) => {
        setAnswer([val])
    }
    const handleMulti = (val) => {
        setAnswer(val)
    }
    const handleMultiImg = (val) => {
        setAnswer(val)
    }
    const examType = (index) => {
        let types = ['单选题', '多选题', '判断题']
        return types[index - 1];
    }

    return (
        <>
            <div className="singlechoice-box">
                <div className="exam-speed">
                    <div className="exam-speed-tle">绿色为答题成功，黄色为标记（可回去检查、更改），红色为未选择</div>
                    <ul className="exam-speed-nr">
                        {
                            questionList.map((item, index) => {
                                if (item.result === 1) {
                                    return (
                                        <li className="speed-nr-li" key={index} onClick={ ()=> showModal(index)}>
                                            <span className="speed-nr-tle">{item.id}</span>
                                            <img className="speed-nr-img" alt="" src="../../../assets/course/start01.png" />
                                        </li>
                                    )
                                }else if (item.result === 2) {
                                    return (
                                        <li className="speed-nr-li" key={index} onClick={ ()=> showModal(index)}>
                                            <span className="speed-nr-tle">{item.id}</span>
                                            <img className="speed-nr-img" alt="" src="../../../assets/course/start02.png" />
                                        </li>
                                    )
                                }else if (item.result === 3) {
                                    return (
                                        <li className="speed-nr-li" key={index} onClick={ ()=> showModal(index)}>
                                            <span className="speed-nr-tle">{item.id}</span>
                                            <img className="speed-nr-img" alt="" src="../../../assets/course/start03.png" />
                                        </li>
                                    )
                                }
                            })
                        }
                        
                    </ul>
                </div>
            </div>

            {/* 弹窗地址 */}
            <div className="popup-wraper"  style={{ display: modalVisible ? "block" : "none" }}></div>
            <div className="popup-box"  style={{ display: modalVisible ? "block" : "none" }}>
                <div className="option-questions-tle">
                    <span>{dataIndex+1}.</span>
                    <span className="single-choice">【{examType(dataItem.type)}】</span>
                    <span>{dataItem.question}（{dataItem.score}分）</span>
                </div>
                
                {showPaperItem()}
                
                <button className="btn-style-exam btn-cancel" onClick={closeModal}>取消</button>
                <button className="btn-style-exam btn-style-exam-on btn-modify" onClick={()=>submitPaper()}>确认修改</button>
            </div>
        </>
    )
}

export default ShowCheck