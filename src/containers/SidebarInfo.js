import ItemInfo from '../components/ItemInfo';
import React from 'react';
import { useQueryItem } from '../data/queries';

export default function SidebarInfo({ params }) {
	const id = atob(params.id);

	const { isLoading, data: item } = useQueryItem(id);

	if (isLoading) {
		return null;
	}

	return (
		<ItemInfo item={item}/>
	);
}
