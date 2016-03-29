import Relay from 'react-relay';

export default class UpdateItemMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
				url,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { updateItem }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on UpdateItemPayload {
				item {
					thumbnail,
					title,
					creator,
					genres,
					characters,
					length,
					productionStatus,
					fieldUpdates,
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			url: this.props.item.url,
			fieldNames: this.props.fieldNames,
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
}
