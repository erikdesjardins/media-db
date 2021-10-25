import React from 'react';
import numeral from 'numeral';

export default function ItemListLength({ item }) {
	return (
		<span className="ItemListLength CompactTable-item">
			{numeral(item.length).format('0a')}
		</span>
	);
}
