import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemLengthMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemLengthMutation_item on Item {
			id
		}
	`;

	constructor({ item, length }) {
		super();
		this.item = item;
		this.length = length;
	}

	getMutation() {
		return graphql`
			mutation EditItemLengthMutation($input: EditItemLengthInput!) {
				editItemLength(input: $input) {
					item {
						length
						fieldUpdates {
							length
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
			length: this.length,
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
