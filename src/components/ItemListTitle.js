import Markdown from './Markdown';
import React from 'react';

export default function ItemListTitle({ item }) {
	return (
		<div className="ItemListTitle CompactTable-item CompactTable-item--nowrap CompactTable-item--truncate">
			<Markdown
				source={`[${item.title}](${item.url} "${item.title}")${item.tags}`}
			/>
		</div>
	);
}
