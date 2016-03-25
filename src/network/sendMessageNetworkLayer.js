import formatRequestErrors from '../utils/formatRequestErrors';
import { QUERY } from '../constants/messages';
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

export default {
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
};
