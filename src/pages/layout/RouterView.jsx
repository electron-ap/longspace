import React, { Suspense, Fragment } from 'react'
import { Spin } from 'antd'
import { Switch, Route, Redirect } from 'react-router-dom'
import { adminRoutes } from '../../routes';

// import Profile from "../dashboard/Profile"

function RouterView() {
    const renderRoute = (menus) => {
        return menus.map((item,key) => {
            if (item.children && item.children.length > 0) {
                return (
                    <Fragment key={`fragment${key}`}>
                        <Route path={item.path} key={item.path} exact={item.exact} component={ item.component} />
                        <Switch key={`switch${key}`}>
                            { renderRoute(item.children)}
                        </Switch>
                    </Fragment>
                )
            } else {
                return item.path === '/' ? null : <Route path={item.path} key={item.path} exact={item.exact} component={ item.component} />
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
