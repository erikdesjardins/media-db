import AutosaveInput from './AutosaveInput';
import EditItemLengthMutation from '../mutations/EditItemLengthMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemLength_item on Item {
		length
		...ItemRefreshButton_item
		...EditItemLengthMutation_item @relay(mask: false)
	}
`)
class ItemLength extends React.Component {
	handleSave = value => {
		new EditItemLengthMutation({
			item: this.props.item,
			length: value,
		}).commit(this.props.relay.environment);
	};

	render() {
		return (
			<AutosaveInput
				type="number"
				label={
					<div>
						{'Length'}
						{' '}
						<ItemRefreshButton
							item={this.props.item}
							fields={['length']}
						/>
					</div>
				}
				defaultValue={this.props.item.length}
				onSave={this.handleSave}
			/>
		);
	}
}
