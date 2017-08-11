import AutosaveInput from './AutosaveInput';
import EditItemNotesMutation from '../mutations/EditItemNotesMutation';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemNotes_item on Item {
		notes
		...EditItemNotesMutation_item @relay(mask: false)
	}
`)
class ItemNotes extends React.Component {
	handleSave = value => {
		new EditItemNotesMutation({
			item: this.props.item,
			notes: value,
		}).commit(this.props.relay.environment);
	};

	styles = {
		textarea: {
			resize: 'vertical',
		},
	};

	render() {
		return (
			<AutosaveInput
				style={this.styles.textarea}
				componentClass="textarea"
				label="Notes"
				defaultValue={this.props.item.notes}
				onSave={this.handleSave}
			/>
		);
	}
}
