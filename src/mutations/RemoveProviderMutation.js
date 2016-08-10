import Relay from 'react-relay';

export default class RemoveProviderMutation extends Relay.Mutation {
	static fragments = {
		provider: () => Relay.QL`
			fragment on Provider {
				id
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				id
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { removeProvider }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on RemoveProviderPayload {
				deletedProviderId
				viewer {
					providers
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.provider.id,
		};
	}

	getConfigs() {
		return [{
			type: 'NODE_DELETE',
			parentName: 'viewer',
			parentID: this.props.viewer.id,
			connectionName: 'providers',
			deletedIDFieldName: 'deletedProviderId',
		}];
	}

	getOptimisticResponse() {
		return {
			deletedProviderId: this.props.provider.id,
			viewer: {
				id: this.props.viewer.id,
			},
		};
	}
}
