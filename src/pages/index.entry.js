import App from '../components/App';
import ItemList from '../components/ItemList';
import React from 'react';
import Relay from 'react-relay';
import sendMessageNetworkLayer from '../network/sendMessageNetworkLayer';
import { IndexRedirect, IndexRoute, Redirect, Route, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(sendMessageNetworkLayer);

render((
	<RelayRouter history={browserHistory}>
		<Redirect from="/index.html" to="/"/>
		<Route path="/" component={App}>
			<IndexRedirect to="items"/>
			<Route
				path="items" component={ItemList}
				queries={{
					viewer: () => Relay.QL`query { viewer }`,
				}}
			>
				<Route path="items/:id" component={null}>
					<IndexRoute component={null}/>
					<Route path="items/:id/history" component={null}/>
				</Route>
			</Route>
			<Route path="providers" component={null}/>
			<Route path="storage" component={null}/>
			<Route path="*" component={null}/>
		</Route>
	</RelayRouter>
), document.getElementById('app'));
