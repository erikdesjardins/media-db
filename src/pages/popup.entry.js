import App from '../components/App';
import ChromeNetworkLayer from '../network/ChromeNetworkLayer';
import React from 'react';
import Relay from 'react-relay';
import { Route, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(new ChromeNetworkLayer());

render((
	<RelayRouter
		history={browserHistory}
		routes={
			<Route
				path="/popup.html" component={App}
				queries={{
					viewer: () => Relay.QL`query { viewer }`,
				}}
			/>
		}
	/>
), document.getElementById('app'));
