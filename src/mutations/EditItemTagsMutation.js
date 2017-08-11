import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemTagsMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemTagsMutation_item on Item {
			id
		}
	`;

	constructor({ item, tags }) {
		super();
		this.item = item;
		this.tags = tags;
	}

	getMutation() {
		return graphql`
			mutation EditItemTagsMutation($input: EditItemTagsInput!) { 
				editItemTags(input: $input) {
					item {
						tags
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
			tags: this.tags,
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
