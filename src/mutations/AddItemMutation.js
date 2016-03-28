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
		return {
			localId: String(Math.random()).slice(2),
		};
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
				[`status(${statusTypes.PENDING})`]: null,
				[`status(${statusTypes.IN_PROGRESS})`]: null,
				// note: this corresponds to the status of the added node
				[`status(${statusTypes.COMPLETE})`]: 'append',
				[`status(${statusTypes.REJECTED})`]: null,
			},
		}];
	}

	getOptimisticResponse() {
		return {
			itemEdge: {
				node: {
					url: '',
					title: '',
					creator: '',
					genres: [],
					characters: [],
					status: 'COMPLETE',
					productionStatus: 'COMPLETE',
					statusDate: Date.now(),
				},
			},
			viewer: {
				id: this.props.viewer.id,
			},
		};
	}
}
