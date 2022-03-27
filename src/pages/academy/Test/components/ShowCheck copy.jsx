import React, { useEffect,useState } from 'react'
import { Radio, Checkbox, Row, Col } from 'antd';
function ShowCheck(props) {
    const { res } = props
    function onChange(e, checkedValues) {
        // console.log(`radio checked:${e.target.value}`);
        // console.log('checked = ', checkedValues);
    }
    // 多选择
    const plainOptions = ['A：3个步骤', 'B：4个步骤', 'C：5个步骤', 'D：6个步骤'];

    const [questionList, setQuestionList] = useState([]) // 所有试题集合 // 1 正常答题  2：标记  3：跳过

    useEffect(()=>{
        setQuestionList([
            {id: 1, result: 1},
            {id: 2, result: 1},
            {id: 3, result: 2},
            {id: 4, result: 2},
            {id: 5, result: 1},
            {id: 6, result: 1},
            {id: 7, result: 3},
            {id: 8, result: 3},
            {id: 9, result: 1},
            {id: 10, result: 1},
            {id: 11, result: 1},
            {id: 12, result: 1},
            {id: 13, result: 1},
            {id: 14, result: 1},
            {id: 15, result: 2},
            {id: 16, result: 1},
        ])
    },[])


    const [modalVisible, setModalVisible] = useState(false)
    const [dataItem, setDataItem] = useState({}) // 当前试题数据

    const showModal = (id) =>{
        setModalVisible(true)
    }

    const closeModal = () =>{
        setModalVisible(false)
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
                                        <li className="speed-nr-li" key={index} onClick={ ()=> showModal(item.id)}>
                                            <span className="speed-nr-tle">{item.id}</span>
                                            <img className="speed-nr-img" alt="" src="../../../assets/course/start01.png" />
                                        </li>
                                    )
                                }else if (item.result === 2) {
                                    return (
                                        <li className="speed-nr-li" key={index} onClick={ ()=> showModal(item.id)}>
                                            <span className="speed-nr-tle">{item.id}</span>
                                            <img className="speed-nr-img" alt="" src="../../../assets/course/start02.png" />
                                        </li>
                                    )
                                }else if (item.result === 3) {
                                    return (
                                        <li className="speed-nr-li" key={index} onClick={ ()=> showModal(item.id)}>
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
                    <span>3.</span>
                    <span className="single-choice">【单选题】</span>
                    <span>3D打印机的操作分为几个步骤？（3分）</span>
                </div>
                <div className="group-dan" style={{ display: "none" }}>
                    <Radio.Group onChange={onChange} defaultValue="a">
                        <Radio.Button value="a">A：3个步骤</Radio.Button>
                        <Radio.Button value="b">B：4个步骤</Radio.Button>
                        <Radio.Button value="c">C：5个步骤</Radio.Button>
                        <Radio.Button value="d">D：6个步骤</Radio.Button>
                    </Radio.Group>
                </div>
                <div className="group-duo" style={{ display: "none" }}>
                    <Checkbox.Group options={plainOptions} defaultValue={['A：3个步骤']} onChange={onChange} />
                </div>
                <div className="group-duo group-duopc">
                    <Checkbox.Group style={{ width: '100%' }} onChange={onChange}>
                        <Row>
                            <Col span={8}>
                                <Checkbox value="A"><span className="duo-span">A：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="B"><span className="duo-span">B：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="C"><span className="duo-span">C：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
                            </Col>
                            <Col span={8}>
                                <Checkbox value="D"><span className="duo-span">D：3个步骤</span><img className="duo-img" alt="" src="../../../assets/course/pct01.png" /></Checkbox>
                            </Col>
                        </Row>
                    </Checkbox.Group>
                </div>
                <button className="btn-style-exam btn-cancel" onClick={closeModal}>取消</button>
                <button className="btn-style-exam btn-style-exam-on btn-modify">确认修改</button>
            </div>
        </>
    )
}

export default ShowCheck