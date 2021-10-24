import ItemCharacters from './ItemCharacters';
import ItemGenres from './ItemGenres';
import ItemLength from './ItemLength';
import ItemNotes from './ItemNotes';
import ItemProductionStatus from './ItemProductionStatus';
import ItemStatus from './ItemStatus';
import ItemTags from './ItemTags';
import ItemThumbnail from './ItemThumbnail';
import ItemTitleBlock from './ItemTitleBlock';
import React from 'react';

export default function ItemInfo({ item }) {
	return (
		<div key={item.id} className="ItemInfo">
			<ItemThumbnail item={item}/>
			<ItemTitleBlock item={item}/>
			<ItemStatus item={item}/>
			<ItemProductionStatus item={item}/>
			<ItemGenres item={item}/>
			<ItemCharacters item={item}/>
			<ItemLength item={item}/>
			<ItemNotes item={item}/>
			<ItemTags item={item}/>
		</div>
	);
}
