import Relay from 'react-relay';

export default class EditItemStatusMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemStatus }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemStatusPayload {
				item {
					status,
					statusDate,
					history,
				},
				viewer {
					items,
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			status: this.props.status,
		};
	}

	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs: {
				item: this.props.item.id,
				viewer: this.props.viewer.id,
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
				status: this.props.status,
				statusDate: Date.now(),
			},
			viewer: {
				id: this.props.viewer.id,
			},
		};
	}
}
