import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class UpdateProviderMutation extends Mutation {
	static fragments = graphql`
		fragment UpdateProviderMutation_provider on Provider {
			id
		}
	`;

	constructor({ provider, infoCallback }) {
		super();
		this.provider = provider;
		this.infoCallback = infoCallback;
	}

	getMutation() {
		return graphql`
			mutation UpdateProviderMutation($input: UpdateProviderInput!) {
				updateProvider(input: $input) {
					provider {
						infoCallback
					}
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.provider.id,
			infoCallback: this.infoCallback,
		};
	}
}
