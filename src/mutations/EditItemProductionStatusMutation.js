import Relay from 'react-relay';

export default class EditItemProductionStatusMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemProductionStatus }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemProductionStatusPayload {
				item {
					productionStatus,
					fieldUpdates,
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			productionStatus: this.props.productionStatus,
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
				productionStatus: this.props.productionStatus,
			},
		};
	}
}
