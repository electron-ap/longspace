import React, { Suspense,} from 'react'
import { Spin } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRoutes } from '../../routes';

// import Profile from "../dashboard/Profile"

function RouterView() {


    const renderRoute = (menus) => {
        return menus.map(item => {
            if (item.children && item.children.length > 0) {
                return renderRoute(item.children)
            } else {
                return item.path === '/' ? null : <Route path={item.path} key={item.path} exact component={ item.component} />
            }
        })
    }
    return (
        <Suspense fallback={<div className="loading-box"><Spin size="large" style={{ marginTop: '20%' }} /></div>} >
            <Switch>
                {
                    renderRoute(adminRoutes)
                }
                {/* <Route path="/admin/profile" key='profile' exact component={Profile} /> */}
                {/* <Redirect to="/404"/> */}
            </Switch>
        </Suspense>
    )
}
export default RouterView
