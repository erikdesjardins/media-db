import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from 'react-query';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import Header from './containers/Header';
import History from './containers/History';
import Items from './containers/Items';
import Popup from './containers/Popup';
import Providers from './containers/Providers';
import Search from './containers/Search';
import Sidebar from './containers/Sidebar';
import Storage from './containers/Storage';
import { queryClient } from './data/queries';

const root = createRoot(document.getElementById('app'));

root.render((
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
				<Route path="providers/:url" element={<Providers/>}/>
				<Route path="storage" element={<Storage/>}/>
			</Routes>
		</HashRouter>
	</QueryClientProvider>
));
