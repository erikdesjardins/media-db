import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class AddProviderMutation extends Mutation {
	static fragments = graphql`
		fragment AddProviderMutation_viewer on User {
			id
		}
	`;

	constructor({ viewer }) {
		super();
		this.viewer = viewer;
	}

	getMutation() {
		return graphql`
			mutation AddProviderMutation($input: AddProviderInput!) {
				addProvider(input: $input) {
					providerEdge {
						node {
							...fields_Provider
						}
					}
				}
			}
		`;
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			edgeName: 'providerEdge',
			parentID: this.viewer.id,
			connectionName: 'providers',
			connectionInfo: [{
				key: 'Connection_providers',
				rangeBehavior: 'append',
			}],
		}];
	}
}
