import React, { useState } from 'react'
import { Form, Select, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import "./Query.scss"

const { Option } = Select;

function Query(props) {
    const { formParams } = props;
    console.log("formParams", formParams)
    const [queryDisplay, setQueryDisplay] = useState(true) // 是否显示搜索条件
    const [curDisplayWay, setCurDisplayWay] = useState("grid") // grid list 网格、列表视图
    const [form] = Form.useForm();
    const changeDisplayWay = (val) => {
        setCurDisplayWay(val)
        props.handleDisplayWay(val)
    }
    let initialValObj = {};
    let tmpKey = "";
    formParams.forEach(item=>{
        if(item.type === "select"){
            tmpKey= item.key;
            initialValObj[tmpKey] = undefined
        }
    })
    const renderMyFormFields = (formParams) => {
        return formParams.map((item, index) => {
            switch (item.type) {
                case "select":
                    return (
                        <Form.Item className="SnSelect-style" name={item.key} key={`p${index}`} >
                            <Select placeholder={item.label} allowClear>
                                {
                                    item.options.map((sonItem, sonKey) => {
                                        return <Option value={sonItem.value} key={`s${sonKey}`}>{sonItem.label}</Option>
                                    })
                                }
                            </Select>
                        </Form.Item>
                    )
                case "text":
                    return (
                        <Form.Item className="SnSpace-style" name={item.key} key={`p${index}`}>
                            <Input placeholder={item.label}  />
                        </Form.Item>
                    )
                default:
                    return null;
            }
        })
    }
    // setTimeout(()=>{
    //     console.log("initialValObj:",initialValObj)
    //     form.setFieldsValue({...initialValObj})
    // },1000)

    const handleFormQuery = async () => {
        let formres = await form.getFieldsValue();
        Object.keys(formres).forEach(key=>{
            console.log(key,formres[key])
            if(formres[key] === undefined){
                formres[key] = "";
            }
        })
        console.log("handleFormQuery formres", formres)
        props.handleFormQuery(formres)
    }

    return (
        <div className="SnSearch-box">
            <div className="SnSearch-tent">
                <div className="SnSearch-tle">{props.children}</div>
                <button className="SnSearch-sh" onClick={() => { setQueryDisplay(!queryDisplay) }}>筛选</button>
                <div className="SnSearch-right">
                    <button className={curDisplayWay==="grid"?"list-pcton":"list-pct"} onClick={() => { changeDisplayWay('grid') }}></button>
                    <button className={curDisplayWay==="list"?"list-tston":"list-tst"}  onClick={() => { changeDisplayWay('list') }}></button>
                </div>
            </div>
            <div className="SnSearch-tn" style={{ display: queryDisplay ? "block" : 'none' }} >
                <div>
                    <Form form={form} layout="inline" initialValues={{...initialValObj}}>
                        {
                            renderMyFormFields(formParams)
                        }
                        <Form.Item>
                            <Button icon={<SearchOutlined />} onClick={() => handleFormQuery()} ></Button>
                        </Form.Item>
                    </Form>
                </div>

                {/* <div className="search-option">
                    <span className="sn-option-on">行业ABC<span className="option-poor">×</span></span>
                    <span className="sn-option-on">PDF<span className="option-poor">×</span></span>
                </div>
                <button className="screen-pon screen-pon-on">应用筛选</button>
                <button className="screen-pon">清除筛选</button> */}
            </div>
        </div>
    )
}

export default Query