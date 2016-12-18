import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				tinyThumbnail
			}
		`,
	},
})
export default class ItemListThumbnail extends React.Component {
	render() {
		return (
			<div className="CompactTable-item">
				{this.props.item.tinyThumbnail &&
					<img className="CompactTable-tinyThumbnail" src={this.props.item.tinyThumbnail}/>
				}
			</div>
		);
	}
}
