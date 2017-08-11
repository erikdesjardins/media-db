import { graphql } from 'react-relay';
import * as statusTypes from '../constants/statusTypes';
import Mutation from './Mutation';

export default class AddActiveTabItemMutation extends Mutation {
	static fragments = graphql`
		fragment AddActiveTabItemMutation_viewer on User {
			id
		}
	`;

	constructor({ viewer }) {
		super();
		this.viewer = viewer;
	}

	getMutation() {
		// https://github.com/4Catalyzer/found-relay/blob/master/examples/todomvc-modern/src/mutations/AddTodoMutation.js
		return graphql`
			mutation AddActiveTabItemMutation($input: AddActiveTabItemInput!) {
				addActiveTabItem(input: $input) {
					viewer {
						itemForActiveTab {
							...fields_Item_scalar
							...fields_Item_history
							...fields_Item_fieldUpdates
						}
					}
					itemEdge {
						node {
							...fields_Item_scalar
							...fields_Item_history
							...fields_Item_fieldUpdates
						}
					}
				}
			}
		`;
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			edgeName: 'itemEdge',
			parentID: this.viewer.id,
			connectionName: 'items',
			connectionInfo: [{
				key: 'Connection_items',
				filters: { status: statusTypes.WAITING },
				rangeBehavior: 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.PENDING },
				rangeBehavior: 'append',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.IN_PROGRESS },
				rangeBehavior: 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.COMPLETE },
				rangeBehavior: 'ignore',
			}, {
				key: 'Connection_items',
				filters: { status: statusTypes.REJECTED },
				rangeBehavior: 'ignore',
			}],
		}];
	}
}
