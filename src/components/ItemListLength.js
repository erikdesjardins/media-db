import React from 'react';
import Relay from 'react-relay';
import numeral from 'numeral';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				length
			}
		`,
	},
})
export default class ItemListLength extends React.Component {
	render() {
		return (
			<span className="CompactTable-item">
				{numeral(this.props.item.length).format('0a')}
			</span>
		);
	}
}
