import Relay from 'react-relay';

export default class UpdateItemFieldsMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { updateItemFields }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on UpdateItemFieldsPayload {
				item {
					thumbnail
					title
					creator
					genres
					characters
					length
					productionStatus
					history
					fieldUpdates {
						thumbnail
						title
						creator
						genres
						characters
						length
						productionStatus
					}
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			fieldUpdates: this.props.fieldUpdates,
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
}
