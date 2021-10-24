import Markdown from './Markdown';
import React from 'react';

export default function ItemListCharacters({ item }) {
	return (
		<div className="ItemListCharacters CompactTable-item CompactTable-item--small CompactTable-item--nowrap">
			<Markdown source={item.characters}/>
		</div>
	);
}
