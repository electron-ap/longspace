import React, { useCallback, useEffect, useRef, useState } from 'react'
import "./index.scss"
import { message } from 'antd';
import Single from './components/Single';
import Multi from './components/Multi';
import MultiImg from './components/MultiImg';
import Judge from './components/Judge';
import ShowCheck from './components/ShowCheck';
import Result from './components/Result';
import { examEnter, examPreNext, examSubmit, examProgress, examResult } from "../../../libs/api"
import { formatSeconds } from "../../../libs/utils/function"

function Test(props) {
    const itemKey = useRef(0);
    let topic = props.match.params.topic
    const [paperCurCount, setPaperCurCount] = useState(1) //当前第几题
    const [paperTotalCount, setPaperTotalCount] = useState(0) // 试卷总题数
    const [paperTime, setPaperTime] = useState(0) // 考试总时间秒数
    const [paperTimeShow, setPaperTimeShow] = useState(0) // 考试总时间格式化后的
    const [question, setQuestion] = useState({}) // 当前试题具体内容
    const [questionList, setQuestionList] = useState([]) // 所有试题集合 // 1 正常答题  2：标记  3：跳过
    const [answer, setAnswer] = useState([]) // 答案
    const [mark, setMark] = useState('') // 是否标记
    const [step, setStep] = useState(1) // 1：答题中， 2：显示答题结果列表块  3：查看考试结果 
    const [testRes, setTestRes] = useState(1) // 考试结果 

    

    const [timerID, setTimerID] = useState(null);

    useEffect(() => {

        if (paperTime > 0) {
            let timer = setTimeout(() => {
                setPaperTime(paperTime - 1)
                setPaperTimeShow(formatSeconds(paperTime - 1))
            }, 1000);
            setTimerID(timer)
        } else {
            setPaperTimeShow(formatSeconds(0))
            clearTimeout(timerID)
        }

        return () => {
            setTimerID(null)
        }
    }, [paperTime]);

    useEffect(() => {
        getPaperInfo()
    }, [])

    // 获取试卷信息
    const getPaperInfo = async () => {
        await examEnter({ topic }).then(res => {
            if (res.code === "200") {
                setPaperTotalCount(res.count)
                setPaperTime(res.countdown)
                setQuestion(res.data)
            }else{
                props.history.go(-1)
                message.info(res.msg)
            }
        }).catch(err => { })
    }

    // 获取下一题
    const getQuestion = () => {
        // clearTimeout(timerID)
        examPreNext({ next: paperCurCount + 1 }).then(res => {
            if (res.code === "200") {
                itemKey.current = new Date().valueOf()
                setPaperCurCount(paperCurCount + 1)
                setAnswer([])
                setQuestion(res.data)
            }
        }).catch(err => { })
    }

    // 提交试卷
    const submitPaper = () => {
        let result = mark===1?2:1
        let tmp_arr = questionList;
        tmp_arr.push({ id: paperCurCount, result })
        setQuestionList([...tmp_arr])
        console.log("questionList", questionList)
        examSubmit({ order: paperCurCount, answer: JSON.stringify(answer), mark }).then(res => {
            if (res.code === 204) {
                if (paperCurCount !== paperTotalCount) {
                    itemKey.current = new Date().valueOf()
                    getQuestion();
                    setMark('')
                } else {
                    setStep(2)
                }
            }
        }).catch(err => { })
    }

    const examType = (index) => {
        let types = ['单选题', '多选题', '判断题']
        return types[index - 1];
    }

    const showPaperItem = () => {
        if (question.type === 1) {
            return <Single key={itemKey.current} item={question} handlepaperitem={handleSingle}></Single>
        } else if (question.type === 2) {
            if (question.option_a_img === "") {
                return <Multi key={itemKey.current} item={question} handlepaperitem={handleMulti}></Multi>
            } else {
                return <MultiImg key={itemKey.current} item={question} handlepaperitem={handleMultiImg}></MultiImg>
            }
        } else if (question.type === 3) {
            return <Judge key={itemKey.current} item={question} handlepaperitem={handleSingle}></Judge>
        }
    }

    const handleSingle = useCallback((val) => {
        setAnswer([val])
    }, [])
    const handleMulti = (val) => {
        setAnswer(val)
    }
    const handleMultiImg = (val) => {
        setAnswer(val)
    }

    const handleJump = () => {
        if (paperCurCount !== paperTotalCount) {
            let tmp_arr = questionList;
            tmp_arr.push({ id: paperCurCount, result: 3 })
            setQuestionList([...tmp_arr])
            console.log(questionList)
            getQuestion()
        } else {
            handleOkNext();
        }

    }

    const handleMark = () => {
        if (answer.length === 0) {
            message.error("您还未答题，如暂不答，请选择跳过后续再答！")
            return false;
        }
        setMark(1)
        message.info("标记成功！");
    }

    // 确定进入下一题或进入答题列表
    const handleOkNext = () => {
        if (answer.length === 0) {
            message.error("您还未答题，如暂不答，请选择跳过后续再答！")
            return false;
        }
        submitPaper()
    }

    //检查完后提交考虑结果
    const handleSubmitResult = () => {
        console.log(questionList)
        clearTimeout(timerID)// 一定要清除
        setStep(3)
    }

    const paperBody = () => {
        if (step === 1) {
            return (
                <>
                    <div className="exam-title">
                        <div className="exam-title-left">考试进度(<span>{paperCurCount}/{paperTotalCount}</span>)</div>
                        <div className="exam-title-right">
                            <span className="coun-down">倒计时 {paperTimeShow}</span>
                        </div>
                    </div>
                    <div className="option-questions-tle">
                        <span>{paperCurCount}.</span>
                        <span className="single-choice">【{examType(question.type)}】</span>
                        <span>{question.question}（{question.score}分）</span>
                    </div>

                    {showPaperItem()}

                    <button className="singlechoice-skip" onClick={() => { handleJump() }}>跳过</button>
                    <button className="singlechoice-sign" onClick={() => { handleMark() }}>标记</button>
                    <br />
                    <button className="singlechoice-submit" onClick={handleOkNext}>确定</button>
                </>
            )
        } else if (step === 2) {
            return (
                <>
                    <ShowCheck res={questionList}></ShowCheck>
                    <button className="singlechoice-submit" onClick={() => { handleSubmitResult() }}>确定</button>
                </>
            )
        } else if (step === 3) {
            return (
                <>
                    <Result topic={topic}></Result>
                </>
            )
        }
    }


    return (
        <div className="course-all">
            {
                paperBody()
            }
        </div>
    )
}

export default Test