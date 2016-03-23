import React from 'react';
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
	},
})
export default class Item extends React.Component {
	render() {
		const { item: { id, date } } = this.props;
		return (
			<div>{'id:'}{id}{' '}{'date:'}{date}</div>
		);
	}
}
