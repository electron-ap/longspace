import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import AdminLayout from "./pages/layout/AdminLayout"
import { webRoutes } from "./routes/index"

export default class App extends Component {
	render() {
		return (
			<div className="loadingz">
				<Switch>
					{/*后台路由*/}
					<Route path="/agent/" render={props => <AdminLayout {...props} />} />

					{/*前台路由*/}
					{
						webRoutes.map(item => {
							return <Route key={item.path} {...item} />
						})
					}

					{/* <Redirect to="/login" from="/" /> */}
					{/* <Redirect to="/404" /> */}
				</Switch>
			</div>
		)
	}
}
