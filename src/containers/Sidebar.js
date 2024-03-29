import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SidebarItem from '../components/SidebarItem';

export default function Sidebar() {
	const params = useParams();
	const id = atob(params.id);

	const navigate = useNavigate();

	const handleClickItemHistory = useCallback(date => {
		navigate(`/history/${btoa(id)}/${date}`);
	}, [navigate, id]);

	return (
		<div className="Sidebar">
			<SidebarItem itemId={id} onClickItemHistory={handleClickItemHistory}/>
		</div>
	);
}
