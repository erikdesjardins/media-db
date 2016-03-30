import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { formatDate } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				statusDate,
			}
		`,
	},
})
export default class ItemListStatusDate extends React.Component {
	render() {
		return (
			<span className="item-nowrap">
				{formatDate(this.props.item.statusDate)}
			</span>
		);
	}
}
