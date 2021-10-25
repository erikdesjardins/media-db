import Item from './Item';
import React from 'react';

export default function ItemList({ items, onClickItem }) {
	return (
		<table className="ItemList CompactTable CompactTable--stripe CompactTable--hover CompactTable--align">
			<thead>
				<tr>
					<th>{''}</th>
					<th>{'Title'}</th>
					<th>{'Creator'}</th>
					<th>{'Genres'}</th>
					<th>{'Characters'}</th>
					<th>{'Notes'}</th>
					<th>{'Date'}</th>
					<th>{'Len.'}</th>
					<th>{''}</th>
				</tr>
			</thead>
			<tbody>
				{items.map(item => (
					<Item
						key={item.id}
						item={item}
						onClickItem={onClickItem}
					/>
				))}
			</tbody>
		</table>
	);
}
