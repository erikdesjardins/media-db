import ItemList from './ItemList';
import React from 'react';
import { ROW_LIMIT } from '../constants/table';
import { useQueryItemsSearch } from '../data/queries';

export default function SearchList({ query, preview = false, onClickItem }) {
	const { isLoading, data: items } = useQueryItemsSearch(query, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	const limit = preview ? ROW_LIMIT : 2147483647;

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
