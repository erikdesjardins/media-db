import AutosaveInput from './AutosaveInput';
import EditItemLengthMutation from '../mutations/EditItemLengthMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				length
				${ItemRefreshButton.getFragment('item')}
				${EditItemLengthMutation.getFragment('item')}
			}
		`,
	},
})
class ItemLength extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemLengthMutation({
			item: this.props.item,
			length: value,
		}));
	};

	render() {
		return (
			<div>
				<label>
					{'Length'}
					{' '}
					<ItemRefreshButton
						item={this.props.item}
						fields={['length']}
					/>
				</label>
				<AutosaveInput
					type="number"
					defaultValue={this.props.item.length}
					onSave={this.handleSave}
				/>
			</div>
		);
	}
}
