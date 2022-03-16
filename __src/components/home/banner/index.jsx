import React from "react";

import { Carousel } from 'antd';

const Banner = () => {
    return (
        <>
            <div className="mybanner">
            <Carousel autoplay>
                <div>
                <h3><img alt="banner01" src={require("../../../assets/banner01.png")} /></h3>
                </div>
                <div>
                <h3><img alt="banner01" src={require("../../../assets/banner01.png")} /></h3>
                </div>
                <div>
                <h3><img alt="banner01" src={require("../../../assets/banner01.png")} /></h3>
                </div>
                
            </Carousel>
            </div>
        </>
    )
}
export default Banner