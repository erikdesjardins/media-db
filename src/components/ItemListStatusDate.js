import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { formatFullDate } from '../utils/formatDate';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				statusDate
			}
		`,
	},
})
class ItemListStatusDate extends React.Component {
	render() {
		return (
			<span className="ItemListStatusDate CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
				{formatFullDate(this.props.item.statusDate)}
			</span>
		);
	}
}
