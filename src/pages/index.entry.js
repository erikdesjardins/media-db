import App from '../containers/App';
import ItemHistory from '../containers/ItemHistory';
import ItemInfo from '../containers/ItemInfo';
import Items from '../containers/Items';
import Search from '../containers/Search';
import Sidebar from '../containers/Sidebar';
import Storage from '../containers/Storage';
import Providers from '../containers/Providers';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { IndexRedirect, IndexRoute, Route, hashHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

render((
	<RelayRouter history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRedirect to="items"/>
			<Route
				path="items" component={Items}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			>
				<Route path="items/:id" component={Sidebar}>
					<IndexRoute component={ItemInfo}/>
					<Route path="items/:id/history" component={ItemHistory}/>
				</Route>
			</Route>
			<Route path="search/:query" component={Search}/>
			<Route
				path="providers" component={Providers}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			/>
			<Route
				path="storage" component={Storage}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			/>
		</Route>
	</RelayRouter>
), document.getElementById('app'));
