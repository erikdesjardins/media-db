import React from 'react';
import SearchList from '../components/SearchList';
import { useQueryItemsSearch } from '../data/queries';

export default function Search({ params }) {
	const query = atob(params.query);
	const preview = params.preview === 'preview';

	const limit = preview ? 25 : 2147483647;

	const { isLoading, data: items } = useQueryItemsSearch(query, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	return (
		<SearchList items={items.slice(0, limit)}/>
	);
}
