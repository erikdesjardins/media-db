import Popup from '../containers/Popup';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { Redirect, Route, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

render((
	<RelayRouter history={browserHistory}>
		<Redirect from="/popup.html" to="/"/>
		<Route path="/" component={Popup}/>
	</RelayRouter>
), document.getElementById('app'));
