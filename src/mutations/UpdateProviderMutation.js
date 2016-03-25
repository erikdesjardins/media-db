import Relay from 'react-relay';

export default class UpdateProviderMutation extends Relay.Mutation {
	static fragments = {
		provider: () => Relay.QL`
			fragment on Provider {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { updateProvider }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on UpdateProviderPayload {
				provider {
					infoCallback,
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.provider.id,
			infoCallback: this.props.infoCallback,
		};
	}

	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				provider: this.props.provider.id,
			},
		}];
	}

	getOptimisticResponse() {
		return {
			provider: {
				id: this.props.provider.id,
				infoCallback: this.props.infoCallback,
			},
		};
	}
}
