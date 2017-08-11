import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemCharactersMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemCharactersMutation_item on Item {
			id
		}
	`;

	constructor({ item, characters }) {
		super();
		this.item = item;
		this.characters = characters;
	}

	getMutation() {
		return graphql`
			mutation EditItemCharactersMutation($input: EditItemCharactersInput!) {
				editItemCharacters(input: $input) {
					item {
						characters
						fieldUpdates {
							characters
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
			characters: this.characters,
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
