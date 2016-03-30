import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				url,
				title,
			}
		`,
	},
})
export default class ItemListTitle extends React.Component {
	render() {
		return (
			<a href={this.props.item.url}>{this.props.item.title}</a>
		);
	}
}
