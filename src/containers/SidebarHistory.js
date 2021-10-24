import ItemHistory from '../components/ItemHistory';
import React from 'react';
import { useQueryItemHistory } from '../data/queries';

export default function SidebarHistory({ params }) {
	const id = atob(params.id);

	const { isLoading, data: history } = useQueryItemHistory(id);

	if (isLoading) {
		return null;
	}

	return (
		<ItemHistory history={history}/>
	);
}
