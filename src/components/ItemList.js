import Item from './Item';
import React, { Component } from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	initialVariables: {
		limit: 10,
		first: 0,
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				items(limit: $limit, first: $first) {
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
export default class ItemList extends Component {
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
