import ItemView from '../components/ItemView';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export default function Items({ children }) {
	const history = useHistory();

	const handleClickItem = useCallback(item => {
		history.push(`/items/${btoa(item.id)}`);
	}, [history]);

	return (
		<div className="Items">
			<div className="Items-list">
				<ItemView onClickItem={handleClickItem}/>
			</div>
			<div className="Items-sidebar">
				{children}
			</div>
		</div>
	);
}
