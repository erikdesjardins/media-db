import AutosaveInput from './AutosaveInput';
import EditItemTagsMutation from '../mutations/EditItemTagsMutation';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemTags_item on Item {
		tags
		...EditItemTagsMutation_item @relay(mask: false)
	}
`)
class ItemTags extends React.Component {
	handleSave = value => {
		new EditItemTagsMutation({
			item: this.props.item,
			tags: value,
		}).commit(this.props.relay.environment);
	};

	render() {
		return (
			<AutosaveInput
				type="text"
				label="Tags"
				defaultValue={this.props.item.tags}
				onSave={this.handleSave}
			/>
		);
	}
}
