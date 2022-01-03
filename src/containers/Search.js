import { useCallback } from 'react';
import SearchList from '../components/SearchList';
import { useParams, useNavigate, Outlet } from 'react-router-dom';

export default function Search() {
	const params = useParams();
	const query = atob(params.query);

	const navigate = useNavigate();

	const handleClickItem = useCallback(item => {
		navigate(`/search/${btoa(query)}/${btoa(item.id)}`);
	}, [navigate, query]);

	return (
		<div className="Search">
			<div className="Search-list">
				<SearchList query={query} onClickItem={handleClickItem}/>
			</div>
			<div className="Search-sidebar">
				<Outlet/>
			</div>
		</div>
	);
}
