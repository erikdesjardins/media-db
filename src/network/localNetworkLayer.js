import formatRequestErrors from '../utils/formatRequestErrors';

// https://github.com/relay-tools/relay-local-schema/blob/master/src/__forks__/formatRequestErrors.js

export class LocalNetworkLayer {
	constructor(runQuery) {
		this._runQuery = runQuery;
	}

	async _executeRequest(requestType, request) {
		const { data, errors } = await this._runQuery(
			request.getQueryString(),
			request.getVariables()
		);

		if (errors) {
			for (const error of errors) {
				console.error(error.originalError); // eslint-disable-line no-console
			}

			request.reject(new Error(
				`Failed to execute ${requestType} \`${request.getDebugName()}\` for ` +
				`the following reasons:\n\n${formatRequestErrors(request, errors)}` +
				`\n\n${request.getQueryString()}`
			));
		} else {
			request.resolve({ response: data });
		}
	}

	sendMutation(mutationRequest) {
		return this._executeRequest('mutation', mutationRequest);
	}

	sendQueries(queryRequests) {
		return Promise.all(queryRequests.map(queryRequest =>
			this._executeRequest('query', queryRequest)
		));
	}

	supports() {
		return false;
	}
}
