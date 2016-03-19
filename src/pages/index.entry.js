import App from '../components/App';
import React from 'react';
import formatRequestErrors from '../utils/formatRequestErrors';
import { IndexRoute, Route, browserHistory } from 'react-router';
import { QUERY } from '../constants/messages';
import { Relay } from 'react-relay';
import { RelayRouter } from 'react-router-relay';
import { render } from 'react-dom';
import { sendMessage } from '../api/messages';

// https://github.com/relay-tools/relay-local-schema/blob/master/src/__forks__/formatRequestErrors.js
async function executeRequest(requestType, request) {
	const { data, errors } = await sendMessage({
		type: QUERY,
		data: {
			request: request.getQueryString(),
			variables: request.getVariables(),
		},
	});

	if (errors) {
		request.reject(new Error(
			`Failed to execute ${requestType} \`${request.getDebugName()}\` for ` +
			`the following reasons:\n\n${formatRequestErrors(request, errors)}`
		));
	} else {
		request.resolve({ response: data });
	}
}

Relay.injectNetworkLayer({
	sendMutation(mutationRequest) {
		return executeRequest('mutation', mutationRequest);
	},
	sendQueries(queryRequests) {
		return Promise.all(queryRequests.map(queryRequest =>
			executeRequest('query', queryRequest)
		));
	},
	supports() {
		return false;
	},
});

render((
	<RelayRouter
		history={browserHistory}
		routes={
			<Route path="/" component={App}>
				<IndexRoute
					component={null}
					queries={{
						listing: () => Relay.QL`query { items }`,
					}}
				/>
				<Route
					path="after/:first"
					queries={{
						listing: () => Relay.QL`query { items(first: $first) }`,
					}}
				/>
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
), document.body);
