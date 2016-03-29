import Relay from 'react-relay';

export default class EditItemCharactersMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemCharacters }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemCharactersPayload {
				item {
					characters,
					fieldUpdates,
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			characters: this.props.characters,
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
				characters: this.props.characters,
			},
		};
	}
}
