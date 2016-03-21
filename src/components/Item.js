import AddItemMutation from '../mutations/AddItemMutation';
import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id
				date
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${AddItemMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class Item extends React.Component {
	static propTypes = {
		item: PropTypes.shape({
			id: PropTypes.string.isRequired,
			date: PropTypes.number.isRequired,
		}).isRequired,
	};

	render() {
		const { item: { id, date } } = this.props;
		return (
			<div>{'id:'}{id}{' '}{'date:'}{date}</div>
		);
	}
}
