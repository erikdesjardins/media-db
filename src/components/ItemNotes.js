import AutosaveInput from './AutosaveInput';
import EditItemNotesMutation from '../mutations/EditItemNotesMutation';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				notes,
				${EditItemNotesMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemNotes extends ReactCSS.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemNotesMutation({
			item: this.props.item,
			notes: value,
		}));
	};

	classes() {
		return {
			default: {
				textarea: {
					resize: 'vertical',
				},
			},
		};
	}

	render() {
		return (
			<AutosaveInput
				is="textarea"
				type="textarea"
				label="Notes"
				defaultValue={this.props.item.notes}
				onSave={this.handleSave}
			/>
		);
	}
}
