import React from 'react'
import { withRouter} from 'react-router-dom';

import RouterView from "./RouterView"
import Header from "../../components/header"
import Footer from "../../components/footer"


function AdminLayout(props) {
    return (
        <>
            <Header></Header>
            <RouterView />
            <Footer></Footer>
        </>

    )
}

export default withRouter(AdminLayout)
