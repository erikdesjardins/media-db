import AutosaveInput from './AutosaveInput';
import EditItemCharactersMutation from '../mutations/EditItemCharactersMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				characters,
				${EditItemCharactersMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemCharacters extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemCharactersMutation({
			item: this.props.item,
			characters: value,
		}));
	};

	render() {
		return (
			<AutosaveInput
				type="text"
				label="Characters"
				defaultValue={this.props.item.characters}
				onSave={this.handleSave}
			/>
		);
	}
}
