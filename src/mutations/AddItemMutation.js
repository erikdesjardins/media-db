import Relay from 'react-relay';

export default class AddItemMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
				date,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { addItem }`;
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'TO BE IMPLEMENTED', // todo
			parentID: 0, // todo
			connectionName: 'items', // todo, sort of (probably will use this conn name)
			edgeName: 'newItemEdge', // todo, sort of (ditto)
			rangeBehaviors: {
				'': 'prepend',
			},
		}];
	}

	getFatQuery() {
		// todo whatever holds the items will need to have something updated
		return Relay.QL`
			fragment on AddItemPayload {
			}
		`;
	}
}
