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

	if (!itemFromProvider) {
		return null;
	}

	const changedEntriesFromProvider = Object.entries(itemFromProvider)
		.filter(([key, value]) => fields.includes(key) && !structuralEq(value, item[key]));

	if (changedEntriesFromProvider.length === 0) {
		return null;
	}

	const handleClick = () => {
		mutation.mutate(Object.fromEntries(changedEntriesFromProvider));
	};

	return (
		<LinkButton
			className="ItemRefreshButton"
			href="#"
			title={changedEntriesFromProvider.map(([, value]) => value).join(', ')}
			onClick={handleClick}
		>
			{'🔄'}
		</LinkButton>
	);
}
