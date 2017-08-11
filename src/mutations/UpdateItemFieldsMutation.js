import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class UpdateItemFieldsMutation extends Mutation {
	static fragments = graphql`
		fragment UpdateItemFieldsMutation_item on Item {
			id
		}
	`;

	constructor({ item, fieldUpdates }) {
		super();
		this.item = item;
		this.fieldUpdates = fieldUpdates;
	}

	getMutation() {
		return graphql`
			mutation UpdateItemFieldsMutation($input: UpdateItemFieldsInput!) {
				updateItemFields(input: $input) {
					item {
						thumbnail
						tinyThumbnail
						title
						creator
						genres
						characters
						length
						productionStatus
						fieldUpdates {
							thumbnail
							tinyThumbnail
							title
							creator
							genres
							characters
							length
							productionStatus
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
			fieldUpdates: this.fieldUpdates,
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
