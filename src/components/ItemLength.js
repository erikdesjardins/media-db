import AutosaveInput from './AutosaveInput';
import ItemRefreshButton from './ItemRefreshButton';
import { useMutationUpdateItem } from '../data/queries';

export default function ItemLength({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ length: Number(value) });
	};

	return (
		<div className="ItemLength">
			<h3>
				{'Length'}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['length']}
				/>
			</h3>
			<AutosaveInput
				type="number"
				defaultValue={item.length}
				onSave={handleSave}
			/>
		</div>
	);
}
