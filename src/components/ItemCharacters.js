import AutosaveInput from './AutosaveInput';
import EditItemCharactersMutation from '../mutations/EditItemCharactersMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemCharacters_item on Item {
		characters
		...ItemRefreshButton_item
		...EditItemCharactersMutation_item @relay(mask: false)
	}
`)
class ItemCharacters extends React.Component {
	handleSave = value => {
		new EditItemCharactersMutation({
			item: this.props.item,
			characters: value,
		}).commit(this.props.relay.environment);
	};

	render() {
		return (
			<AutosaveInput
				type="text"
				label={
					<div>
						{'Characters'}
						{' '}
						<ItemRefreshButton
							item={this.props.item}
							fields={['characters']}
						/>
					</div>
				}
				defaultValue={this.props.item.characters}
				onSave={this.handleSave}
			/>
		);
	}
}
