import Relay from 'react-relay';

export default class AddProviderMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on User {
				id
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { addProvider }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on AddProviderPayload {
				providerEdge
				viewer {
					providers
				}
			}
		`;
	}

	getVariables() {
		return {};
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'viewer',
			parentID: this.props.viewer.id,
			connectionName: 'providers',
			edgeName: 'providerEdge',
			rangeBehaviors: {
				'': 'append',
			},
		}];
	}

	getOptimisticResponse() {
		return {
			providerEdge: {
				node: {
					infoCallback: '',
				},
			},
			viewer: {
				id: this.props.viewer.id,
			},
		};
	}
}
