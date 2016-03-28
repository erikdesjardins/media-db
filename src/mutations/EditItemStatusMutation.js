import Relay from 'react-relay';

export default class EditItemStatusMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
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
		};
	}
}
