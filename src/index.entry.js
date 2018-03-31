import React from 'react';
import { Environment, Network, Observable, RecordSource, Store } from 'relay-runtime';
import { graphql } from 'graphql/graphql';
import HashProtocol from 'farce/lib/HashProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';
import { render } from 'react-dom';
import schema from './data/schema';
import { routeConfig } from './routes';

// Relay Classic emulation: retain everything, and always lookup from the store
// https://github.com/facebook/relay/blob/c78e2b696bd1363563a8c58c60373c17c8b931a3/packages/relay-runtime/store/RelayModernEnvironment.js#L175-L191
class CachingEnvironment extends Environment {
	execute({ operation, cacheConfig, updater }) {
		// check if request could be satisfied from the store
		const isQuery = operation.node.operationKind === 'query';
		const forceFetch = cacheConfig && cacheConfig.force;
		if (isQuery && !forceFetch) {
			// https://github.com/facebook/relay/blob/61d1f9e5dfddcb77e92a4292c448f1790cbd0209/packages/react-relay/modern/ReactRelayQueryFetcher.js#L48
			// https://github.com/facebook/relay/blob/256b7a77e9f8b9d360282580c9a316c5f079ee13/packages/react-relay/modern/ReactRelayQueryRenderer.js#L255-L266
			if (this.check(operation.root)) {
				const stored = this.lookup(operation.fragment);
				return Observable.from(stored);
			}
			// retain the result of this operation
			// todo this still retains too much (raw storage editing doesn't cause invalidation) -
			// todo   the idea was to manually invalidate all fields
			// todo   on viewer in the SetRawItemsMutation updater.
			// todo   this may still be possible, i.e. by removing all items from the store
			this.retain(operation.root);
		}
		// fall back to the native network implementation
		console.log(operation);
		return super.execute({ operation, cacheConfig, updater });
	}
}

const environment = new CachingEnvironment({
	network: Network.create((request, variables) =>
		graphql(schema, request.text, null, null, variables).then(payload => {
			if (payload.errors) throw new Error(payload.errors);
			return payload;
		}),
	),
	store: new Store(new RecordSource()),
});

const Router = createFarceRouter({
	historyProtocol: new HashProtocol(),
	historyMiddlewares: [queryMiddleware],
	routeConfig,
	render: createRender({
		renderError({ error }) {
			return (
				<div>
					{error.status === 404 ?
						'Not found' :
						<span>{String(error)}</span>
					}
				</div>
			);
		},
	}),
});

render(
	<Router resolver={new Resolver(environment)}/>,
	document.getElementById('app')
);
