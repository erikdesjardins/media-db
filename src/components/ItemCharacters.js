import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { FormControls } from 'react-bootstrap';

const FormControlsStatic = FormControls.Static;

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				characters,
			}
		`,
	},
})
export default class ItemCharacters extends React.Component {
	render() {
		return (
			<FormControlsStatic
				label="Characters"
				value={this.props.item.characters.join(', ')}
			/>
		);
	}
}