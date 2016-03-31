import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { formatNumber } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				length,
			}
		`,
	},
})
export default class ItemListLength extends React.Component {
	render() {
		return (
			<span className="CompactTable-item">
				{formatNumber(this.props.item.length)}
			</span>
		);
	}
}
