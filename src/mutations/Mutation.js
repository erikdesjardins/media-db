import { commitMutation } from 'react-relay';

let id = 0;

export default class Mutation {
	commit(environment) {
		return new Promise((resolve, reject) => {
			commitMutation(environment, {
				mutation: this.getMutation(),
				variables: {
					input: {
						...this.getVariables(),
						clientMutationId: ++id,
					},
				},
				configs: this.getConfigs(),
				onCompleted: resolve,
				onError: reject,
			});
		});
	}

	getMutation() {
		throw new Error('getMutation is not implemented');
	}

	getVariables() {
		return {};
	}

	getConfigs() {
		return [];
	}
}
