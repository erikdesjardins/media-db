import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import * as productionStatusTypes from '../constants/productionStatusTypes';

const statusIcons = {
	[productionStatusTypes.INCOMPLETE]: '✏️',
	[productionStatusTypes.COMPLETE]: '✔️',
	[productionStatusTypes.HIATUS]: '⏸️',
	[productionStatusTypes.CANCELLED]: '🚫',
};

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				productionStatus
			}
		`,
	},
})
class ItemListProductionStatus extends React.Component {
	render() {
		return (
			<div className="ItemListProductionStatus CompactTable-item">
				{statusIcons[this.props.item.productionStatus]}
			</div>
		);
	}
}
