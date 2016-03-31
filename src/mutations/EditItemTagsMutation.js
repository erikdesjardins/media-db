import Relay from 'react-relay';

export default class EditItemTagsMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemTags }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemTagsPayload {
				item {
					tags,
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			tags: this.props.tags,
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
				tags: this.props.tags,
			},
		};
	}
}
