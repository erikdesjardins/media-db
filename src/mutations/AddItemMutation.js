import Relay from 'react-relay';
import * as statusTypes from '../constants/statusTypes';

export default class AddItemMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on User {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { addItem }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on AddItemPayload {
				itemEdge,
				viewer {
					items,
				},
			}
		`;
	}

	getVariables() {
		return {};
	}

	getConfigs() {
		return [{
			type: 'RANGE_ADD',
			parentName: 'viewer',
			parentID: this.props.viewer.id,
			connectionName: 'items',
			edgeName: 'itemEdge',
			rangeBehaviors: {
				'': 'append',
				[`status(${statusTypes.WAITING})`]: null,
				// note: this corresponds to the status of the added node
				[`status(${statusTypes.COMPLETE})`]: 'append',
				[`status(${statusTypes.PENDING})`]: null,
				[`status(${statusTypes.REJECTED})`]: null,
			},
		}];
	}

	getOptimisticResponse() {
		return {
			itemEdge: {
				node: {
					date: Date.now(),
					url: '',
					title: '',
					creator: '',
					genres: [],
					characters: [],
					status: 'Complete',
					productionStatus: 'Complete',
					statusDate: Date.now(),
				},
			},
			viewer: {
				id: this.props.viewer.id,
			},
		};
	}
}
