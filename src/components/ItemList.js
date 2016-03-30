import Item from './Item';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import { Panel, Table } from 'react-bootstrap';
import { panelHeaderButtonCenter } from '../styles/bootstrap';

@relay({
	initialVariables: {
		first: 10,
		status: statusTypes.IN_PROGRESS,
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
			}
		`,
	},
})
export default class ItemList extends ReactCSS.Component {
	handleStatusChange = status => {
		this.props.relay.setVariables({ status });
	};

	classes() {
		return {
			default: {
				statusSelect: {
					...panelHeaderButtonCenter,
				},
			},
		};
	}

	render() {
		return (
			<Panel
				header={
					<SelectBar
						is="statusSelect"
						bsSize="xsmall"
						selected={this.props.relay.variables.status}
						onSelect={this.handleStatusChange}
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
				}
			>
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
							<th>{''}</th>
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
			</Panel>
		);
	}
}
