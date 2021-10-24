import ItemHistory from '../components/ItemHistory';
import React from 'react';
import { useQueryItemHistory } from '../data/queries';
import { useParams } from 'react-router-dom';

export default function SidebarHistory() {
	const params = useParams();
	const id = atob(params.id);

	const { isLoading, data: history } = useQueryItemHistory(id);

	if (isLoading) {
		return null;
	}

	return (
		<ItemHistory history={history}/>
	);
}
