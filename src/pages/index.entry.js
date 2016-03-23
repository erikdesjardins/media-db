import App from '../components/App';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { Redirect, IndexRoute, Route, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

render((
	<RelayRouter history={browserHistory}>
		<Redirect from="/index.html" to="/"/>
		<Route
			path="/" component={App}
			queries={{
				viewer: () => Relay.QL`query { viewer }`,
			}}
		>
			<IndexRoute component={null}/>
			<Route path="items" component={null}>
				<Route path="items/:id" component={null}/>
			</Route>
			<Route path="items/by/:type/:query" component={null}>
				<Route path="items/by/:type/:query/:id" component={null}/>
			</Route>
			<Route path="item/:id" component={null}/>
			<Route path="random" component={null}/>
			<Route path="tabs" component={null}/>
			<Route path="storage" component={null}/>
			<Route path="*" component={null}/>
		</Route>
	</RelayRouter>
), document.getElementById('app'));
