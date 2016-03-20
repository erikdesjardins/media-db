import AddItemMutation from '../mutations/AddItemMutation';
import React, { Component } from 'react';
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
export default class Item extends Component {
	render() {
		const { item: { id, date } } = this.props;
		return (
			<div>{'id:'}{id}{' '}{'date:'}{date}</div>
		);
	}
}
