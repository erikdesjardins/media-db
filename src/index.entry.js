import Popup from './containers/Popup';
import Header from './containers/Header';
import History from './containers/History';
import Items from './containers/Items';
import Search from './containers/Search';
import Sidebar from './containers/Sidebar';
import Storage from './containers/Storage';
import Providers from './containers/Providers';
import { queryClient } from './data/queries';
import ReactDOM from 'react-dom';
import { Navigate, Route, Routes, HashRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';

ReactDOM.render((
	<QueryClientProvider client={queryClient}>
		<HashRouter>
			<Header/>
			<Routes>
				<Route path="/" element={<Navigate to="items" replace/>}/>
				<Route path="popup" element={<Popup/>}/>
				<Route path="items" element={<Items/>}>
					<Route path=":id" element={<Sidebar/>}/>
				</Route>
				<Route path="search/:query" element={<Search/>}>
					<Route path=":id" element={<Sidebar/>}/>
				</Route>
				<Route path="history/:id/:date" element={<History/>}/>
				<Route path="providers" element={<Providers/>}/>
				<Route path="storage" element={<Storage/>}/>
			</Routes>
		</HashRouter>
	</QueryClientProvider>
), document.getElementById('app'));
