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
import { IndexRedirect, Route, Router, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import { QueryClientProvider } from 'react-query';

ReactDOM.render((
	<QueryClientProvider client={queryClient}>
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRedirect to="items"/>
				<Route path="popup" component={Popup}/>
				<Route path="items" component={Items}>
					<Route path=":id" component={Sidebar}>
						<IndexRedirect to="info"/>
						<Route path="info" component={SidebarInfo}/>
						<Route path="history" component={SidebarHistory}/>
					</Route>
				</Route>
				<Route path="search/:query/:preview" component={Search}/>
				<Route path="providers" component={Providers}/>
				<Route path="storage" component={Storage}/>
			</Route>
		</Router>
	</QueryClientProvider>
), document.getElementById('app'));
