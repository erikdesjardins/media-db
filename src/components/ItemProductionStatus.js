import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import SelectBar from './SelectBar';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemProductionStatus({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ productionStatus: value });
	};

	return (
		<div className="ItemProductionStatus">
			<label>
				{'Production Status'}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['productionStatus']}
				/>
			</label>
			<SelectBar
				bsSize="xsmall"
				selected={item.productionStatus}
				onSelect={handleSave}
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
