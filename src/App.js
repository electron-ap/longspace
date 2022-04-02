import React, { useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom';
import ParamsContextProvider from './libs/utils/context';
import AdminLayout from "./pages/layout/AdminLayout"
import { webRoutes } from "./routes/index"

export default function App(){
	const { pathname, state } = useLocation();

	useEffect(() => {
		document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, [pathname, state]);

	return (
		<ParamsContextProvider>
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
		</ParamsContextProvider>
	)
}
