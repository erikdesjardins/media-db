import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import Thumbnail from 'react-bootstrap/es/Thumbnail';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				thumbnail
				${ItemRefreshButton.getFragment('item')}
			}
		`,
	},
})
class ItemThumbnail extends React.Component {
	render() {
		return (
			<div>
				{this.props.item.thumbnail &&
					<Thumbnail src={this.props.item.thumbnail}/>
				}
				<ItemRefreshButton
					item={this.props.item}
					fields={['thumbnail', 'tinyThumbnail']}
				/>
			</div>
		);
	}
}
