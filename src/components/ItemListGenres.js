import Markdown from './Markdown';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				genres
			}
		`,
	},
})
class ItemListGenres extends React.Component {
	render() {
		return (
			<div className="CompactTable-item CompactTable-item--small CompactTable-item--nowrap">
				<Markdown source={this.props.item.genres}/>
			</div>
		);
	}
}
