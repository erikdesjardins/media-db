import AddItemMutation from '../mutations/AddItemMutation';
import Item from './Item';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Table } from 'react-bootstrap';

@relay({
	initialVariables: {
		first: 10,
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				items(first: $first) {
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
	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddItemMutation({ viewer: this.props.viewer }));
	};

	render() {
		return (
			<div>
				<Table striped condensed>
					<thead>
						<tr>
							<th>{'Title'}</th>
							<th>{'Creator'}</th>
							<th>{'Genres'}</th>
							<th>{'Characters'}</th>
							<th>{'Date'}</th>
							<th>{'Length'}</th>
						</tr>
					</thead>
					<tbody>
						{this.props.viewer.items.edges.map(edge =>
							<Item
								key={edge.node.id}
								item={edge.node}
								viewer={this.props.viewer}
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
