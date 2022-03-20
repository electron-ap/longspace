import React from 'react'

function index(props) {
    return (
        <>
            <div className="mymodal-mask" style={{ display: "none" }}></div>
            <div className="mymodal-box" style={{ display: "none" }}>
                {props.children}
            </div>
        </>
    )
}

export default index