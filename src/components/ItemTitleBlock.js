import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				url,
				title,
				creator,
			}
		`,
	},
})
export default class ItemTitleBlock extends React.Component {
	render() {
		const { item } = this.props;
		return (
			<h3>
				<a href={item.url}>{item.title}</a>
				<small>{' by '}{item.creator}</small>
			</h3>
		);
	}
}
