import AutosaveInput from './AutosaveInput';
import ItemRefreshButton from './ItemRefreshButton';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemCharacters({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ characters: value });
	};

	return (
		<div className="ItemCharacters">
			<h3>
				{'Characters'}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['characters']}
				/>
			</h3>
			<AutosaveInput
				type="text"
				defaultValue={item.characters}
				onSave={handleSave}
			/>
		</div>
	);
}
