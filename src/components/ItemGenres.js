import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { FormControls } from 'react-bootstrap';

const FormControlsStatic = FormControls.Static;

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
			<FormControlsStatic
				label="Genres"
				value={this.props.item.genres}
			/>
		);
	}
}
