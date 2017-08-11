import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemGenresMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemGenresMutation_item on Item {
			id
		}
	`;

	constructor({ item, genres }) {
		super();
		this.item = item;
		this.genres = genres;
	}

	getMutation() {
		return graphql`
			mutation EditItemGenresMutation($input: EditItemGenresInput!) {
				editItemGenres(input: $input) {
					item {
						genres
						fieldUpdates {
							genres
						}
					}
					historyItemEdge {
						node {
							...fields_Item_scalar
						}
					}
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.item.id,
			genres: this.genres,
		};
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			edgeName: 'historyItemEdge',
			parentID: this.item.id,
			connectionName: 'history',
			connectionInfo: [{
				key: 'Connection_history',
				rangeBehavior: 'append',
			}],
		}];
	}
}
