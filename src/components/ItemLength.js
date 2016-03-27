import AutosaveInput from './AutosaveInput';
import EditItemLengthMutation from '../mutations/EditItemLengthMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				length,
				${EditItemLengthMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemLength extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemLengthMutation({
			item: this.props.item,
			length: value,
		}));
	};

	render() {
		return (
			<AutosaveInput
				type="number"
				label="Length"
				defaultValue={this.props.item.length}
				onSave={this.handleSave}
			/>
		);
	}
}
