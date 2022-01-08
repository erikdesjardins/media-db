import { useMutationUpdateItem } from '../data/queries';
import AutosaveInput from './AutosaveInput';

export default function ItemNotes({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ notes: value });
	};

	return (
		<div className="ItemNotes">
			<h3>
				{'Notes'}
			</h3>
			<AutosaveInput
				type="textarea"
				rows={4}
				defaultValue={item.notes}
				onSave={handleSave}
			/>
		</div>
	);
}
