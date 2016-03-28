import EditItemStatusMutation from '../mutations/EditItemStatusMutation';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import { formatDate } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				status,
				statusDate
				${EditItemStatusMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemStatus extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemStatusMutation({
			item: this.props.item,
			status: value,
		}));
	};

	render() {
		return (
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
				{'Updated: '}{formatDate(this.props.item.statusDate)}
			</div>
		);
	}
}