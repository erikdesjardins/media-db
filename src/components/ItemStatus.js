import EditItemStatusMutation from '../mutations/EditItemStatusMutation';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import SelectBar from './SelectBar';
import * as statusTypes from '../constants/statusTypes';
import ControlLabel from 'react-bootstrap/es/ControlLabel';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';

export default
@fragmentContainer(graphql`
	fragment ItemStatus_item on Item {
		status
		...EditItemStatusMutation_item @relay(mask: false)
	}
	fragment ItemStatus_viewer on User {
		...EditItemStatusMutation_viewer @relay(mask: false)
	}
`)
class ItemStatus extends React.Component {
	handleSave = value => {
		new EditItemStatusMutation({
			item: this.props.item,
			viewer: this.props.viewer,
			status: value,
		}).commit(this.props.relay.environment);
	};

	render() {
		return (
			<FormGroup>
				<ControlLabel>{'Status'}</ControlLabel>
				<FormControl.Static>
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
				</FormControl.Static>
			</FormGroup>
		);
	}
}
