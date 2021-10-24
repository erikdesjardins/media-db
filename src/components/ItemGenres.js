import AutosaveInput from './AutosaveInput';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemGenres({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ genres: value });
	};

	return (
		<div className="ItemGenres">
			<label>
				{'Genres'}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['genres']}
				/>
			</label>
			<AutosaveInput
				type="text"
				defaultValue={item.genres}
				onSave={handleSave}
			/>
		</div>
	);
}
