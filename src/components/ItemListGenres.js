import Markdown from './Markdown';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				genres,
			}
		`,
	},
})
export default class ItemListGenres extends React.Component {
	render() {
		return (
			<Markdown source={this.props.item.genres}/>
		);
	}
}
