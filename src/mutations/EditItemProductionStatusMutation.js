import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemProductionStatusMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemProductionStatusMutation_item on Item {
			id
		}
	`;

	constructor({ item, productionStatus }) {
		super();
		this.item = item;
		this.productionStatus = productionStatus;
	}

	getMutation() {
		return graphql`
			mutation EditItemProductionStatusMutation($input: EditItemProductionStatusInput!) {
				editItemProductionStatus(input: $input) {
					item {
						productionStatus
						fieldUpdates {
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
			productionStatus: this.productionStatus,
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
