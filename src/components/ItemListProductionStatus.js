import React from 'react';
import * as productionStatusTypes from '../constants/productionStatusTypes';

const statusIcons = {
	[productionStatusTypes.INCOMPLETE]: '✏️',
	[productionStatusTypes.COMPLETE]: '✔️',
	[productionStatusTypes.HIATUS]: '⏸️',
	[productionStatusTypes.CANCELLED]: '🚫',
};

export default function ItemListProductionStatus({ item }) {
	return (
		<div className="ItemListProductionStatus CompactTable-item">
			{statusIcons[item.productionStatus]}
		</div>
	);
}
