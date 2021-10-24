import ItemInfo from '../components/ItemInfo';
import React from 'react';
import { useQueryItem } from '../data/queries';
import { useParams } from 'react-router-dom';

export default function SidebarInfo() {
	const params = useParams();
	const id = atob(params.id);

	const { isLoading, data: item } = useQueryItem(id);

	if (isLoading) {
		return null;
	}

	return (
		<ItemInfo item={item}/>
	);
}
