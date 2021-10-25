import React from 'react';
import FullDate from './FullDate';

export default function ItemListStatusDate({ item }) {
	return (
		<div className="ItemListStatusDate CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
			<FullDate date={item.statusDate}/>
		</div>
	);
}
