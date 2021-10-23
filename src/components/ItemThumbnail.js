import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

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
			<div className="ItemThumbnail">
				{this.props.item.thumbnail &&
					<img className="ItemThumbnail-img" src={this.props.item.thumbnail}/>
				}
				<ItemRefreshButton
					item={this.props.item}
					fields={['thumbnail', 'tinyThumbnail']}
				/>
			</div>
		);
	}
}
