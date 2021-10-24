import Markdown from './Markdown';
import React from 'react';

export default function ItemListNotes({ item }) {
	return (
		<div className="ItemListNotes CompactTable-item CompactTable-item--autowrap CompactTable-item--small">
			<Markdown source={item.notes}/>
		</div>
	);
}
