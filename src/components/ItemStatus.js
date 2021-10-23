import EditItemStatusMutation from '../mutations/EditItemStatusMutation';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				status
				${EditItemStatusMutation.getFragment('item')}
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${EditItemStatusMutation.getFragment('viewer')}
			}
		`,
	},
})
class ItemStatus extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemStatusMutation({
			item: this.props.item,
			viewer: this.props.viewer,
			status: value,
		}));
	};

	render() {
		return (
			<div>
				<label>
					{'Status'}
				</label>
				<div>
					<SelectBar
						bsSize="xsmall"
						selected={this.props.item.status}
						onSelect={this.handleSave}
						options={[{
							value: statusTypes.WAITING,
							name: 'Waiting',
						}, {
							value: statusTypes.PENDING,
							name: 'Pending',
						}, {
							value: statusTypes.IN_PROGRESS,
							name: 'In Progress',
						}, {
							value: statusTypes.COMPLETE,
							name: 'Complete',
						}, {
							value: statusTypes.REJECTED,
							name: 'Rejected',
						}]}
					/>
				</div>
			</div>
		);
	}
}
