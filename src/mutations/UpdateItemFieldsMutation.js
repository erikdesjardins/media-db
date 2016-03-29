import Relay from 'react-relay';

export default class UpdateItemFieldsMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
				url,
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
