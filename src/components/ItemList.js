import Item from './Item';
import React from 'react';
import PropTypes from 'prop-types';
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
	static propTypes = {
		offset: PropTypes.number,
		limit: PropTypes.number,
		style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
	};

	static defaultProps = {
		offset: 0,
		limit: Infinity,
	};

	render() {
		const { items, offset, limit, style } = this.props;

		return (
			<table
				style={style}
				className="CompactTable CompactTable--stripe CompactTable--hover CompactTable--align"
			>
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
