import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class RemoveProviderMutation extends Mutation {
	static fragments = graphql`
		fragment RemoveProviderMutation_provider on Provider {
			id
		}
		fragment RemoveProviderMutation_viewer on User {
			id
		}
	`;

	constructor({ provider, viewer }) {
		super();
		this.provider = provider;
		this.viewer = viewer;
	}

	getMutation() {
		return graphql`
			mutation RemoveProviderMutation($input: RemoveProviderInput!) {
				removeProvider(input: $input) {
					deletedProviderId
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.provider.id,
		};
	}

	getConfigs() {
		return [{
			type: 'RANGE_DELETE',
			deletedIDFieldName: 'deletedProviderId',
			parentID: this.viewer.id,
			pathToConnection: ['viewer', 'providers'],
			connectionKeys: [{
				key: 'Connection_providers',
			}],
		}];
	}
}
