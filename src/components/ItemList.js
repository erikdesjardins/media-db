import AddItemMutation from '../mutations/AddItemMutation';
import Item from './Item';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import { Button, ButtonGroup, Table } from 'react-bootstrap';

@relay({
	initialVariables: {
		first: 10,
		status: statusTypes.COMPLETE,
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				items(first: $first, status: $status) {
					edges {
						node {
							id
							${Item.getFragment('item')}
						}
					}
				}
				${AddItemMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class ItemList extends React.Component {
	handleStatusChange(status) {
		this.props.relay.setVariables({ status });
	}

	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddItemMutation({ viewer: this.props.viewer }));
	};

	isCurrentStatus(status) {
		return this.props.relay.variables.status === status;
	}

	render() {
		return (
			<div>
				<ButtonGroup bsSize="xsmall">
					<Button
						active={this.isCurrentStatus(statusTypes.WAITING)}
						onClick={() => this.handleStatusChange(statusTypes.WAITING)}
					>
						{'Waiting'}
					</Button>
					<Button
						active={this.isCurrentStatus(statusTypes.COMPLETE)}
						onClick={() => this.handleStatusChange(statusTypes.COMPLETE)}
					>
						{'Complete'}
					</Button>
					<Button
						active={this.isCurrentStatus(statusTypes.PENDING)}
						onClick={() => this.handleStatusChange(statusTypes.PENDING)}
					>
						{'Pending'}
					</Button>
					<Button
						active={this.isCurrentStatus(statusTypes.REJECTED)}
						onClick={() => this.handleStatusChange(statusTypes.REJECTED)}
					>
						{'Rejected'}
					</Button>
				</ButtonGroup>
				<Table striped condensed>
					<thead>
						<tr>
							<th>{'Title'}</th>
							<th>{'Creator'}</th>
							<th>{'Genres'}</th>
							<th>{'Characters'}</th>
							<th>{'Notes'}</th>
							<th>{'Date'}</th>
							<th>{'Length'}</th>
						</tr>
					</thead>
					<tbody>
						{this.props.viewer.items.edges.map(edge =>
							<Item
								key={edge.node.id}
								item={edge.node}
							/>
						)}
					</tbody>
				</Table>
				<button onClick={this.handleAddItem}>
					{'add item'}
				</button>
			</div>
		);
	}
}
