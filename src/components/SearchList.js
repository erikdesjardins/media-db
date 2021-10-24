import ItemList from './ItemList';
import React from 'react';

export default function SearchList({ items }) {
	return (
		<fieldset className="SearchList">
			<ItemList items={items}/>
		</fieldset>
	);
}
