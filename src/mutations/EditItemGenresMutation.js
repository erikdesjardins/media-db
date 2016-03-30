import Relay from 'react-relay';

export default class EditItemGenresMutation extends Relay.Mutation {
	static fragments = {
		item: () => Relay.QL`
			fragment on Item {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { editItemGenres }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on EditItemGenresPayload {
				item {
					genres,
					fieldUpdates {
						genres,
					},
				},
			}
		`;
	}

	getVariables() {
		return {
			id: this.props.item.id,
			genres: this.props.genres,
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
				genres: this.props.genres,
			},
		};
	}
}
