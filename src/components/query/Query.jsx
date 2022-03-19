import React, { useState } from 'react'
import { Select, Input, Space } from 'antd';
import "./Query.scss"

const { Option } = Select;
const { Search } = Input;

function Query(props) {
    const [queryDisplay, setQueryDisplay] = useState(true)
    const [displayWay, setDisplayWay] = useState("grid") // grid list

    const changeDisplayWay = (val) => {
        setDisplayWay(val);
        props.handleDisplayWay(val)
    }

    const onSearch = value => console.log(value);

    return (
        <div className="SnSearch-box">
            <div className="SnSearch-tent">
                <div className="SnSearch-tle">{props.children}</div>
                <button className="SnSearch-sh" onClick={() => { setQueryDisplay(!queryDisplay) }}>筛选</button>
                <div className="SnSearch-right">
                    <button className="list-pct" onClick={() => { changeDisplayWay('grid') }}></button>
                    <button className="list-tst" onClick={() => { changeDisplayWay('list') }}></button>
                </div>
            </div>

            <div className="SnSearch-tn" style={{ display: queryDisplay ? "block" : 'none' }} >
                <div>
                    <Select className="SnSelect-style" defaultValue="行业">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Select className="SnSelect-style" defaultValue="应用">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Select className="SnSelect-style" defaultValue="文件格式">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                    </Select>
                    <Space className="SnSpace-style" direction="vertical">
                        <Search placeholder="input search text" onSearch={onSearch} enterButton />
                    </Space>
                </div>
                <div className="search-option">
                    <span className="sn-option-on">行业ABC<span className="option-poor">×</span></span>
                    <span className="sn-option-on">PDF<span className="option-poor">×</span></span>
                </div>
                <button className="screen-pon screen-pon-on">应用筛选</button>
                <button className="screen-pon">清除筛选</button>
            </div>
        </div>
    )
}

export default Query