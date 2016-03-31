import Item from './Item';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		items: () => Relay.QL`
			fragment on ItemConnection {
				edges {
					node {
						id
						${Item.getFragment('item')}
					}
				}
			}
		`,
	},
})
export default class ItemList extends React.Component {
	render() {
		return (
			<table className="CompactTable CompactTable--stripe CompactTable--hover CompactTable--align">
				<thead>
					<tr>
						<th>{''}</th>
						<th>{'Title'}</th>
						<th>{'Creator'}</th>
						<th>{'Genres'}</th>
						<th>{'Characters'}</th>
						<th>{'Notes'}</th>
						<th>{'Date'}</th>
						<th>{'Len.'}</th>
						<th>{''}</th>
					</tr>
				</thead>
				<tbody>
					{this.props.items.edges.map(edge =>
						<Item
							key={edge.node.id}
							item={edge.node}
						/>
					)}
				</tbody>
			</table>
		);
	}
}
