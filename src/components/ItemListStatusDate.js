import React from 'react';
import { formatFullDate } from '../utils/formatDate';

export default function ItemListStatusDate({ item }) {
	return (
		<span className="ItemListStatusDate CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
			{formatFullDate(item.statusDate)}
		</span>
	);
}
