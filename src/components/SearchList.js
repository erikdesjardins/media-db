import ItemList from './ItemList';
import React from 'react';
import { ROW_LIMIT } from '../constants/table';
import { useQueryItemsSearch } from '../data/queries';

export default function SearchList({ query, preview, onClickItem }) {
	const { isLoading, data: items } = useQueryItemsSearch(query, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	const limit = preview ? ROW_LIMIT : 2147483647;

	return (
		<fieldset className="SearchList">
			<legend className="SearchList-legend">
				{items.length}
				{' '}
				{'Results'}
				{preview &&
					<>
						{' '}
						{'('}
						{Math.min(items.length, limit)}
						{' '}
						{'Shown'}
						{')'}
					</>
				}
			</legend>
			<ItemList items={items.slice(0, limit)} onClickItem={onClickItem}/>
		</fieldset>
	);
}
