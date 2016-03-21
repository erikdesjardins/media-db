import Item from './Item';
import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

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
				${Item.getFragment('viewer')}
			}
		`,
	},
})
export default class ItemList extends React.Component {
	static propTypes = {
		first: PropTypes.number.isRequired,
		viewer: PropTypes.shape({
			items: PropTypes.shape({
				edges: PropTypes.arrayOf(
					Item.propTypes.item
				).isRequired,
			}).isRequired,
		}).isRequired,
	};

	render() {
		return (
			<div>
				<h1>{'Testing'}</h1>
				{this.props.viewer.items.edges.map(edge =>
					<Item
						key={edge.node.id}
						item={edge.node}
						viewer={this.props.viewer}
					/>
				)}
			</div>
		);
	}
}
