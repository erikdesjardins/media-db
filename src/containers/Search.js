import { useCallback } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import SearchList from '../components/SearchList';

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
