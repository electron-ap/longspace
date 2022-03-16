import React, { useEffect, useState } from 'react'
import { withRouter, Redirect, useHistory } from 'react-router-dom';
import { Dropdown, Badge } from 'antd';

import RouterView from "./RouterView"
import { adminRoutes } from '../../routes';
import Header from "../../components/header"
import Footer from "../../components/footer"


function AdminLayout(props) {
    const [routers, setRouters] = useState(adminRoutes)

    return (
        <>
            <Header></Header>
            <RouterView />
            <Footer></Footer>
        </>

    )
}

export default withRouter(AdminLayout)
