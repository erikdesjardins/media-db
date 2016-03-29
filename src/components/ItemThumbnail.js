import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Thumbnail } from 'react-bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				thumbnail,
			}
		`,
	},
})
export default class ItemThumbnail extends React.Component {
	render() {
		return (
			<Thumbnail src={this.props.item.thumbnail}/>
		);
	}
}
