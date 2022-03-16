import React from 'react'
import { useHistory } from 'react-router-dom';
import { Result, Button } from 'antd';

function PageNotFound() {
    const history = useHistory();
    return (
        <div>
            <Result
                status="error"
                title="页面不存在"
                // subTitle="Please check and modify the following information before resubmitting."
                extra={[
                    <Button type="primary" key="back" onClick={() => { history.goBack() }}>返回上一页</Button>,
                    <Button key="home" onClick={() => { history.push("/") }}>访问首页</Button>,
                ]}
            ></Result>
        </div>
    )
}

export default PageNotFound
