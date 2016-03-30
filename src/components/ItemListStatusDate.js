import React from 'react';
import ReactCSS from 'reactcss';
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
export default class ItemListStatusDate extends ReactCSS.Component {
	classes() {
		return {
			default: {
				date: {
					whiteSpace: 'nowrap',
				},
			},
		};
	}

	render() {
		return (
			<span is="date">
				{formatDate(this.props.item.statusDate)}
			</span>
		);
	}
}
