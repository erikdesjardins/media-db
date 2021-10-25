import Popup from './containers/Popup';
import Header from './containers/Header';
import Items from './containers/Items';
import Search from './containers/Search';
import Sidebar from './containers/Sidebar';
import Storage from './containers/Storage';
import Providers from './containers/Providers';
import { queryClient } from './data/queries';
import ReactDOM from 'react-dom';
import { Redirect, Route, HashRouter, Switch } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

ReactDOM.render((
	<QueryClientProvider client={queryClient}>
		<HashRouter>
			<Header/>
			<Switch>
				<Redirect exact from="/" to="items"/>
				<Route path="/popup">
					<Popup/>
				</Route>
				<Route path="/items">
					<Items>
						<Route path="/items/:id">
							<Sidebar/>
						</Route>
					</Items>
				</Route>
				<Route path="/search/:query">
					<Search>
						<Route path="/search/:query/:id">
							<Sidebar/>
						</Route>
					</Search>
				</Route>
				<Route path="/providers">
					<Providers/>
				</Route>
				<Route path="/storage">
					<Storage/>
				</Route>
			</Switch>
		</HashRouter>
	</QueryClientProvider>
), document.getElementById('app'));
