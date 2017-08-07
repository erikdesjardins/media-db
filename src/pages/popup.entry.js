import Popup from '../containers/Popup';
import React from 'react';
import Relay from 'react-relay';
import schema from '../data/schema';
import { graphql } from 'graphql';
import { LocalNetworkLayer } from '../network/localNetworkLayer';
import { Route, Router, applyRouterMiddleware, hashHistory } from 'react-router';
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
		<Route
			path="/" component={Popup}
			queries={{ viewer: () => Relay.QL`query { viewer }` }}
		/>
	</Router>
), document.getElementById('app'));
