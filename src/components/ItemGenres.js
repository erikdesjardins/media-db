import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { FormControls } from 'react-bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				genres,
			}
		`,
	},
})
export default class ItemGenres extends React.Component {
	render() {
		return (
			<FormControls.Static
				label="Genres"
				value={this.props.item.genres.join(', ')}
			/>
		);
	}
}
