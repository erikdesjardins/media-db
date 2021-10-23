import React from 'react';
import Relay from 'react-relay';
import numeral from 'numeral';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				length
			}
		`,
	},
})
class ItemListLength extends React.Component {
	render() {
		return (
			<span className="ItemListLength CompactTable-item">
				{numeral(this.props.item.length).format('0a')}
			</span>
		);
	}
}
