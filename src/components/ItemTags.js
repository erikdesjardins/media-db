import AutosaveInput from './AutosaveInput';
import EditItemTagsMutation from '../mutations/EditItemTagsMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				tags
				${EditItemTagsMutation.getFragment('item')}
			}
		`,
	},
})
class ItemTags extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemTagsMutation({
			item: this.props.item,
			tags: value,
		}));
	};

	render() {
		return (
			<div>
				<label>
					{'Tags'}
				</label>
				<AutosaveInput
					type="text"
					defaultValue={this.props.item.tags}
					onSave={this.handleSave}
				/>
			</div>
		);
	}
}
