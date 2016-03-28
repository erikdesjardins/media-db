import Popup from '../containers/Popup';
import PopupInfo from '../containers/PopupInfo';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { IndexRoute, Route, hashHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

render((
	<RelayRouter history={hashHistory}>
		<Route path="/" component={Popup}>
			<IndexRoute
				component={PopupInfo}
				queries={{
					item: () => Relay.QL`query { itemForActiveTab }`,
					viewer: () => Relay.QL`query { viewer }`,
				}}
			/>
		</Route>
	</RelayRouter>
), document.getElementById('app'));
