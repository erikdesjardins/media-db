import AutosaveInput from './AutosaveInput';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemCharacters({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ characters: value });
	};

	return (
		<div className="ItemCharacters">
			<label>
				{'Characters'}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['characters']}
				/>
			</label>
			<AutosaveInput
				type="text"
				defaultValue={item.characters}
				onSave={handleSave}
			/>
		</div>
	);
}
