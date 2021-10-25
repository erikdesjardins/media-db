import Markdown from './Markdown';
import React from 'react';

export default function ItemListTitle({ item }) {
	return (
		<div className="ItemListTitle CompactTable-item CompactTable-item--nowrap CompactTable-item--truncate">
			<div>
				<p>
					<a href={item.url} title={item.title}>{item.title}</a>
					{item.tags ? <Markdown source={item.tags} inline/> : null}
				</p>
			</div>
		</div>
	);
}
