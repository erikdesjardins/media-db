import Relay from 'react-relay';

export default class EditItemLengthMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemLength }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemLengthPayload {
				item {
					length,
					history,
					fieldUpdates {
						length,
					},
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			length: this.props.length,
		};
	}

	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				item: this.props.item.id,
			},
		}, {
			type: 'RANGE_ADD',
			parentName: 'item',
			parentID: this.props.item.id,
			connectionName: 'history',
			edgeName: 'historyItemEdge',
			rangeBehaviors: {
				'': 'append',
			},
		}];
	}

	getOptimisticResponse() {
		return {
			item: {
				id: this.props.item.id,
				length: this.props.length,
			},
		};
	}
}
