import AutosaveInput from './AutosaveInput';
import EditItemNotesMutation from '../mutations/EditItemNotesMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				notes
				${EditItemNotesMutation.getFragment('item')}
			}
		`,
	},
})
class ItemNotes extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemNotesMutation({
			item: this.props.item,
			notes: value,
		}));
	};

	render() {
		return (
			<div className="ItemNotes">
				<label>
					{'Notes'}
				</label>
				<AutosaveInput
					type="textarea"
					defaultValue={this.props.item.notes}
					onSave={this.handleSave}
				/>
			</div>
		);
	}
}
