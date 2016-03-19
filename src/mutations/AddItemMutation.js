import Relay from 'react-relay';

export default class AddItemMutation extends Relay.Mutation {
	getMutation() {
		return Relay.QL`mutation { addItem }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on AddItemPayload {
				itemEdge
			}
		`;
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'items',
			parentID: 0,
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
		};
	}
}
