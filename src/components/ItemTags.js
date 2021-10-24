import AutosaveInput from './AutosaveInput';
import React from 'react';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemTags({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ tags: value });
	};

	return (
		<div className="ItemTags">
			<label>
				{'Tags'}
			</label>
			<AutosaveInput
				type="text"
				defaultValue={item.tags}
				onSave={handleSave}
			/>
		</div>
	);
}
