import ItemList from './ItemList';
import React from 'react';
import { ROW_LIMIT } from '../constants/table';

export default function SearchList({ items, preview }) {
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
			<ItemList items={items.slice(0, limit)}/>
		</fieldset>
	);
}
