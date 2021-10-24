import AutosaveInput from './AutosaveInput';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemLength({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ length: value });
	};

	return (
		<div className="ItemLength">
			<label>
				{'Length'}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['length']}
				/>
			</label>
			<AutosaveInput
				type="number"
				defaultValue={item.length}
				onSave={handleSave}
			/>
		</div>
	);
}
