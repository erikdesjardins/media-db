import ItemList from './ItemList';
import { ROW_LIMIT } from '../constants/table';
import { useQueryItemsSearch } from '../data/queries';

export default function SearchList({ query, preview = false, onClickItem }) {
	const { isLoading, isError, error, data: items } = useQueryItemsSearch(query, { keepPreviousData: true });

	const limit = preview ? ROW_LIMIT : 2147483647;

	if (isLoading) {
		return null;
	}

	if (isError) {
		return (
			<fieldset className="SearchList">
				{'❌'}{' '}{error.message}
			</fieldset>
		);
	}

	return (
		<fieldset className="SearchList Utils-fieldset--noPadding">
			<legend className="SearchList-legend">
				{'Viewing'}
				{' '}{Math.min(items.length, limit)}{' '}
				{'results'}
				{preview &&
					<>
						{' '}{'('}{items.length}{' '}{'total'}{')'}
					</>
				}
			</legend>
			<ItemList items={items.slice(0, limit)} onClickItem={onClickItem}/>
		</fieldset>
	);
}
