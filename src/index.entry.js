import App from './containers/App';
import Popup from './containers/Popup';
import Items from './containers/Items';
import Search from './containers/Search';
import Sidebar from './containers/Sidebar';
import SidebarInfo from './containers/SidebarInfo';
import SidebarHistory from './containers/SidebarHistory';
import Storage from './containers/Storage';
import Providers from './containers/Providers';
import { queryClient } from './data/queries';
import React from 'react';
import ReactDOM from 'react-dom';
import { Redirect, Route, HashRouter, Switch } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

ReactDOM.render((
	<QueryClientProvider client={queryClient}>
		<HashRouter>
			<App>
				<Switch>
					<Redirect exact from="/" to="items"/>
					<Route path="/popup">
						<Popup/>
					</Route>
					<Route path="/items">
						<Items>
							<Route path="/items/:id">
								<Sidebar>
									<Switch>
										<Redirect exact from="/items/:id/" to="/items/:id/info"/>
										<Route path="/items/:id/info">
											<SidebarInfo/>
										</Route>
										<Route path="/items/:id/history">
											<SidebarHistory/>
										</Route>
									</Switch>
								</Sidebar>
							</Route>
						</Items>
					</Route>
					<Route path="/search/:query/:preview">
						<Search/>
					</Route>
					<Route path="/providers">
						<Providers/>
					</Route>
					<Route path="/storage">
						<Storage/>
					</Route>
				</Switch>
			</App>
		</HashRouter>
	</QueryClientProvider>
), document.getElementById('app'));
