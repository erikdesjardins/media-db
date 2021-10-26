import AutosaveInput from './AutosaveInput';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemTags({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ tags: value });
	};

	return (
		<div className="ItemTags">
			<h3>
				{'Tags'}
			</h3>
			<AutosaveInput
				type="text"
				defaultValue={item.tags}
				onSave={handleSave}
			/>
		</div>
	);
}
