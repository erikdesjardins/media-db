import React from 'react';
import SearchList from '../components/SearchList';
import { useHistory, useParams } from 'react-router-dom';

export default function Search() {
	const params = useParams();
	const query = atob(params.query);
	const preview = params.preview === 'preview';

	const history = useHistory();

	const handleClickItem = item => {
		history.push(`/items/${btoa(item.id)}`);
	};

	return (
		<SearchList query={query} preview={preview} onClickItem={handleClickItem}/>
	);
}
