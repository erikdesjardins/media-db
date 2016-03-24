import Popup from '../containers/Popup';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { Route, hashHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

render((
	<RelayRouter history={hashHistory}>
		<Route path="/" component={Popup}/>
	</RelayRouter>
), document.getElementById('app'));
