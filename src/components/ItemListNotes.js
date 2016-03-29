import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				notes,
			}
		`,
	},
})
export default class ItemListNotes extends React.Component {
	render() {
		return (
			<span>
				{this.props.item.notes}
			</span>
		);
	}
}
