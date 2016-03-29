import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				creator,
			}
		`,
	},
})
export default class ItemListCreator extends React.Component {
	render() {
		return (
			<span>
				{this.props.item.creator}
			</span>
		);
	}
}
