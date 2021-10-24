import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';

export default function ItemTitleBlock({ item }) {
	return (
		<h3 className="ItemTitleBlock">
			<a href={item.url}>{item.title}</a>
			<small>
				{' by '}{item.creator}
				{' '}
				<ItemRefreshButton
					item={item}
					fields={['title', 'creator']}
					showLoadingIcon={false}
				/>
			</small>
		</h3>
	);
}
