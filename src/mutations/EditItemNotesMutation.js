import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemNotesMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemNotesMutation_item on Item {
			id
		}
	`;

	constructor({ item, notes }) {
		super();
		this.item = item;
		this.notes = notes;
	}

	getMutation() {
		return graphql`
			mutation EditItemNotesMutation($input: EditItemNotesInput!) {
				editItemNotes(input: $input) {
					item {
						notes
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
			notes: this.notes,
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
