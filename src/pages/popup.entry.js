import Popup from '../containers/Popup';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { Route, Router, applyRouterMiddleware, hashHistory } from 'react-router';
import useRelay from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

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
