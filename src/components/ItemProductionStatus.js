import EditItemProductionStatusMutation from '../mutations/EditItemProductionStatusMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as productionStatusTypes from '../constants/productionStatusTypes';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				productionStatus
				${ItemRefreshButton.getFragment('item')}
				${EditItemProductionStatusMutation.getFragment('item')}
			}
		`,
	},
})
class ItemProductionStatus extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemProductionStatusMutation({
			item: this.props.item,
			productionStatus: value,
		}));
	};

	render() {
		return (
			<div className="ItemProductionStatus">
				<label>
					{'Production Status'}
					{' '}
					<ItemRefreshButton
						item={this.props.item}
						fields={['productionStatus']}
					/>
				</label>
				<SelectBar
					bsSize="xsmall"
					selected={this.props.item.productionStatus}
					onSelect={this.handleSave}
					options={[{
						value: productionStatusTypes.INCOMPLETE,
						name: 'Incomplete',
					}, {
						value: productionStatusTypes.HIATUS,
						name: 'Hiatus',
					}, {
						value: productionStatusTypes.COMPLETE,
						name: 'Complete',
					}, {
						value: productionStatusTypes.CANCELLED,
						name: 'Cancelled',
					}]}
				/>
			</div>
		);
	}
}
