import App from './containers/App';
import Popup from './containers/Popup';
import Items from './containers/Items';
import Search from './containers/Search';
import Sidebar from './containers/Sidebar';
import SidebarInfo from './containers/SidebarInfo';
import SidebarHistory from './containers/SidebarHistory';
import Storage from './containers/Storage';
import Providers from './containers/Providers';
import React from 'react';
import Relay from 'react-relay';
import schema from './data/schema';
import { graphql } from 'graphql';
import { LocalNetworkLayer } from './network/localNetworkLayer';
import { IndexRedirect, Route, Router, applyRouterMiddleware, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import { render } from 'react-dom';

// http://graphql.org/docs/api-reference-graphql/#graphql
// https://github.com/relay-tools/relay-local-schema/blob/master/src/NetworkLayer.js
Relay.injectNetworkLayer(
	new LocalNetworkLayer((request, variables) => graphql(schema, request, null, null, variables))
);

render((
	<Router
		history={hashHistory}
		render={applyRouterMiddleware(useRelay)}
		environment={Relay.Store}
	>
		<Route path="/" component={App}>
			<IndexRedirect to="items"/>
			<Route
				path="popup" component={Popup}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			/>
			<Route
				path="items" component={Items}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			>
				<Route path=":id" component={Sidebar}>
					<IndexRedirect to="info"/>
					<Route
						path="info" component={SidebarInfo}
						prepareParams={({ id }) => ({ id: decodeURIComponent(id) })}
						queries={{
							item: () => Relay.QL`query { node(id: $id) }`,
							viewer: () => Relay.QL`query { viewer }`,
						}}
					/>
					<Route
						path="history" component={SidebarHistory}
						prepareParams={({ id }) => ({ id: decodeURIComponent(id) })}
						queries={{ item: () => Relay.QL`query { node(id: $id) }` }}
					/>
				</Route>
			</Route>
			<Route
				path="search/:query/:preview" component={Search}
				prepareParams={({ query, preview }) => ({ query: atob(query), preview: preview === 'preview' })}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			/>
			<Route
				path="providers" component={Providers}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			/>
			<Route
				path="storage" component={Storage}
				queries={{ viewer: () => Relay.QL`query { viewer }` }}
			/>
		</Route>
	</Router>
), document.getElementById('app'));
