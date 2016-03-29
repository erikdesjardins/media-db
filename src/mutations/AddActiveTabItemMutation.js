import Relay from 'react-relay';
import * as statusTypes from '../constants/statusTypes';

export default class AddActiveTabItemMutation extends Relay.Mutation {
	static fragments = {
		viewer: () => Relay.QL`
			fragment on User {
				id,
			}
		`,
	};

	getMutation() {
		return Relay.QL`mutation { addActiveTabItem }`;
	}

	getFatQuery() {
		return Relay.QL`
			fragment on AddActiveTabItemPayload {
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
				[`status(${statusTypes.PENDING})`]: 'append',
				[`status(${statusTypes.IN_PROGRESS})`]: null,
				[`status(${statusTypes.COMPLETE})`]: null,
				[`status(${statusTypes.REJECTED})`]: null,
			},
		}];
	}
}
