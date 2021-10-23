import Item from './Item';
import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
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
class ItemList extends React.Component {
	static propTypes = {
		offset: PropTypes.number,
		limit: PropTypes.number,
	};

	static defaultProps = {
		offset: 0,
		limit: Infinity,
	};

	render() {
		const { items, offset, limit } = this.props;

		return (
			<table className="ItemList CompactTable CompactTable--stripe CompactTable--hover CompactTable--align">
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
					{items.edges.slice(offset, offset + limit).map(edge =>
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
