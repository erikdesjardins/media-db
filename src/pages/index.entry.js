import App from '../components/App';
import ChromeNetworkLayer from '../network/ChromeNetworkLayer';
import React from 'react';
import Relay from 'react-relay';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';

Relay.injectNetworkLayer(new ChromeNetworkLayer());

render((
	<RelayRouter
		history={browserHistory}
		routes={
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
		}
	/>
), document.getElementById('app'));
