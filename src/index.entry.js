import React from 'react';
import { Environment, Network, QueryResponseCache, RecordSource, Store } from 'relay-runtime';
import { graphql } from 'graphql/graphql';
import HashProtocol from 'farce/lib/HashProtocol';
import queryMiddleware from 'farce/lib/queryMiddleware';
import createFarceRouter from 'found/lib/createFarceRouter';
import createRender from 'found/lib/createRender';
import { Resolver } from 'found-relay';
import { render } from 'react-dom';
import schema from './data/schema';
import { routeConfig } from './routes';

const cache = new QueryResponseCache({ size: Infinity, ttl: Infinity });

const environment = new Environment({
	network: Network.create((operation, variables, cacheConfig) => {
		const isQuery = operation.operationKind === 'query';
		const forceFetch = cacheConfig.force;

		if (isQuery && !forceFetch) {
			const cachedPayload = cache.get(operation.name, variables);
			if (cachedPayload !== null) return cachedPayload;
		}

		return graphql(schema, operation.text, null, null, variables).then(payload => {
			if (payload.errors) throw new Error(payload.errors);

			if (isQuery) {
				// query response, save to cache
				cache.set(operation.name, variables, payload);
			} else {
				// non-query response (mutation), clear the cache
				cache.clear();
			}

			return payload;
		});
	}),
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
