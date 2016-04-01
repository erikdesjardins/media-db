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
					history,
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
				genres: this.props.genres,
			},
		};
	}
}
