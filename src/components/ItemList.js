import AddItemMutation from '../mutations/AddItemMutation';
import Item from './Item';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import { Table } from 'react-bootstrap';


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
	handleStatusChange = status => {
		this.props.relay.setVariables({ status });
	};

	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddItemMutation({ viewer: this.props.viewer }));
	};

	render() {
		return (
			<div>
				<SelectBar
					bsSize="small"
					selected={this.props.relay.variables.status}
					onSelect={this.handleStatusChange}
					options={[{
						value: statusTypes.WAITING,
						name: 'Waiting',
					}, {
						value: statusTypes.COMPLETE,
						name: 'Complete',
					}, {
						value: statusTypes.PENDING,
						name: 'Pending',
					}, {
						value: statusTypes.REJECTED,
						name: 'Rejected',
					}]}
				/>
				<Table striped condensed hover responsive>
					<thead>
						<tr>
							<th>{''}</th>
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
