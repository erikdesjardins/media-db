import ItemView from '../components/ItemView';
import { useCallback } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

export default function Items() {
	const navigate = useNavigate();

	const handleClickItem = useCallback(item => {
		navigate(`/items/${btoa(item.id)}`);
	}, [navigate]);

	return (
		<div className="Items">
			<div className="Items-list">
				<ItemView onClickItem={handleClickItem}/>
			</div>
			<div className="Items-sidebar">
				<Outlet/>
			</div>
		</div>
	);
}
