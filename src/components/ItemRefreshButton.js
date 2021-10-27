import LinkButton from './LinkButton';
import { useMutationUpdateItem, useQueryItemFromProvider } from '../data/queries';
import { structuralEq } from '../utils/object';

export default function ItemRefreshButton({ item, fields, showLoadingIcon = true }) {
	const { isLoading, isError, error, data: itemFromProvider } = useQueryItemFromProvider(item.url);

	const mutation = useMutationUpdateItem(item.id);

	if (isLoading) {
		return (
			<span className="ItemRefreshButton">
				{showLoadingIcon ? '…' : null}
			</span>
		);
	}
	if (isError) {
		return (
			<span className="ItemRefreshButton" title={error.message}>
				{showLoadingIcon ? '❌' : null}
			</span>
		);
	}

	const relevantEntriesFromProvider = Object.entries(itemFromProvider).filter(([key]) => fields.includes(key));
	const anyChanges = relevantEntriesFromProvider.some(([key, value]) => !structuralEq(value, item[key]));

	if (!anyChanges) {
		return null;
	}

	const handleClick = () => {
		mutation.mutate(Object.fromEntries(relevantEntriesFromProvider));
	};

	return (
		<LinkButton
			className="ItemRefreshButton"
			href="#"
			title={relevantEntriesFromProvider.map(([, value]) => value).join(', ')}
			onClick={handleClick}
		>
			{'🔄'}
		</LinkButton>
	);
}
