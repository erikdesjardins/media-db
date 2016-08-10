import Relay from 'react-relay';

export default class EditItemNotesMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemNotes }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemNotesPayload {
				item {
					notes
					history
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			notes: this.props.notes,
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
				notes: this.props.notes,
			},
		};
	}
}
