import AutosaveInput from './AutosaveInput';
import React from 'react';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemNotes({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ notes: value });
	};

	return (
		<div className="ItemNotes">
			<label>
				{'Notes'}
			</label>
			<AutosaveInput
				type="textarea"
				defaultValue={item.notes}
				onSave={handleSave}
			/>
		</div>
	);
}
