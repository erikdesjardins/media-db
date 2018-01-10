import { graphql } from 'react-relay';
import * as statusTypes from '../constants/statusTypes';
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
						id
						status
						statusDate
					}
					historyItemEdge {
						node {
							...fields_Item_scalar
						}
					}
					itemEdge {
						node {
							id
						}
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
				key: 'Connection_history',
				rangeBehavior: 'append',
			}],
		}, {
			type: 'RANGE_ADD',
			edgeName: 'itemEdge',
			parentID: this.viewer.id,
			connectionName: 'items',
			connectionInfo: [{
				key: 'Connection_items',
				filters: { status: statusTypes.WAITING },
				rangeBehavior: this.status === statusTypes.WAITING ? 'append' : 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.PENDING },
				rangeBehavior: this.status === statusTypes.PENDING ? 'append' : 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.IN_PROGRESS },
				rangeBehavior: this.status === statusTypes.IN_PROGRESS ? 'append' : 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.COMPLETE },
				rangeBehavior: this.status === statusTypes.COMPLETE ? 'append' : 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.REJECTED },
				rangeBehavior: this.status === statusTypes.REJECTED ? 'append' : 'ignore',
			}],
		}, {
			type: 'RANGE_DELETE',
			deletedIDFieldName: ['item', 'id'],
			parentID: this.viewer.id,
			pathToConnection: ['viewer', 'items'],
			connectionKeys: [{
				key: 'Connection_items',
				filters: { status: this.item.status },
			}],
		}];
	}
}
