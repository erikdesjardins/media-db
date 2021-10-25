import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';

export default function ItemThumbnail({ item }) {
	return (
		<div className="ItemThumbnail">
			{item.thumbnail &&
				<img className="ItemThumbnail-img" src={item.thumbnail}/>
			}
			<ItemRefreshButton
				item={item}
				fields={['thumbnail', 'tinyThumbnail']}
				showLoadingIcon={false}
			/>
		</div>
	);
}
