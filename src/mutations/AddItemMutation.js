import Relay from 'react-relay';

export default class AddItemMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on User {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { addItem }`;
	}

	getVariables() {
		return {};
	}

	getFatQuery() {
		return Relay.QL`
			fragment on AddItemPayload {
				itemEdge,
				viewer {
					items,
				},
			}
		`;
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'viewer',
			parentID: this.props.viewer.id,
			connectionName: 'items',
			edgeName: 'itemEdge',
			rangeBehaviors: {
				'': 'append',
			},
		}];
	}

	getOptimisticResponse() {
		return {
			itemEdge: {
				node: {
					date: Date.now(),
				},
			},
			viewer: {
				id: this.props.viewer.id,
			},
		};
	}
}
