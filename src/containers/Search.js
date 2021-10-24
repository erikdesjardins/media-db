import React from 'react';
import SearchList from '../components/SearchList';
import { useHistory, useParams } from 'react-router-dom';

export default function Search({ children }) {
	const params = useParams();
	const query = atob(params.query);

	const history = useHistory();

	const handleClickItem = item => {
		history.push(`/search/${params.query}/${btoa(item.id)}`);
	};

	return (
		<div className="Search">
			<div className="Search-list">
				<SearchList query={query} onClickItem={handleClickItem}/>
			</div>
			<div className="Search-sidebar">
				{children}
			</div>
		</div>
	);
}
