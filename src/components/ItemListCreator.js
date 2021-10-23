import Markdown from './Markdown';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				creator
			}
		`,
	},
})
class ItemListCreator extends React.Component {
	render() {
		return (
			<div className="ItemListCreator CompactTable-item CompactTable-item--nowrap">
				<Markdown source={this.props.item.creator}/>
			</div>
		);
	}
}
