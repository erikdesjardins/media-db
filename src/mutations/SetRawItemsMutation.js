import Relay from 'react-relay';

export default class SetRawItemsMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on User {
				id
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { setRawItems }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on SetRawItemsPayload {
				viewer
			}
		`;
	}

	getVariables() {
		return {
			rawItems: this.props.rawItems,
		};
	}

	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				viewer: this.props.viewer.id,
			},
		}];
	}

	getOptimisticResponse() {
		return {
			viewer: {
				id: this.props.viewer.id,
				rawItems: this.props.rawItems,
			},
		};
	}
}
