import { ROW_LIMIT } from '../constants/table';
import { useQueryItems } from '../data/queries';
import { repeatWhile } from '../utils/array';
import ItemList from './ItemList';

export default function SearchList({ query, preview = false, onClickItem }) {
	const { isLoading, data: allItems } = useQueryItems({ keepPreviousData: true });

	const limit = preview ? ROW_LIMIT : 2147483647;

	if (isLoading) {
		return null;
	}

	let items;
	try {
		items = filterItemsByQuery(allItems, query);
	} catch (e) {
		return (
			<fieldset className="SearchList">
				{'❌'}{' '}{e.message}
			</fieldset>
		);
	}

	return (
		<fieldset className="SearchList Utils-fieldset--noPadding">
			<legend className="SearchList-legend">
				{'Viewing'}
				{' '}{Math.min(items.length, limit)}{' '}
				{'results'}
				{preview ?
					<>
						{' '}{'('}{items.length}{' '}{'total'}{')'}
					</> :
					null
				}
			</legend>
			<ItemList items={items.slice(0, limit)} onClickItem={onClickItem}/>
		</fieldset>
	);
}

function filterItemsByQuery(allItems, query) {
	// field:regex field2:regex with spaces
	const queryRegex = /\b(\w+):((?:\S+\s*?)+)\s*(?=\w+:|$)/g;

	const filters = repeatWhile(() => queryRegex.exec(query))
		.map(([, key, regex]) => [key, new RegExp(regex, 'i')]);

	const items = allItems
		.filter(item => filters.every(([key, regex]) => regex.test(item[key])));

	return items;
}
