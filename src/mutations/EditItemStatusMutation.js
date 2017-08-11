import { graphql } from 'react-relay';
import Mutation from './Mutation';

export default class EditItemStatusMutation extends Mutation {
	static fragments = graphql`
		fragment EditItemStatusMutation_item on Item {
			id
			status
		}
		fragment EditItemStatusMutation_viewer on User {
			id
		}
	`;

	constructor({ item, viewer, status }) {
		super();
		this.item = item;
		this.viewer = viewer;
		this.status = status;
	}

	getMutation() {
		return graphql`
			mutation EditItemStatusMutation($input: EditItemStatusInput!) {
				editItemStatus(input: $input) {
					item {
						status
						statusDate
					}
					historyItemEdge { ...ItemEdge }
					viewer {
						items { ...ItemConnection }
					}
				}
			}
		`;
	}

	getVariables() {
		return {
			id: this.item.id,
			status: this.status,
		};
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			edgeName: 'historyItemEdge',
			parentID: this.item.id,
			connectionName: 'history',
			connectionInfo: [{
				key: 'Item_history',
				rangeBehaviour: 'append',
			}],
		}];
	}
}
