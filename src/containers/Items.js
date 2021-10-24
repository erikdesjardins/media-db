import ItemView from '../components/ItemView';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Items({ children }) {
	const history = useHistory();

	const handleClickItem = item => {
		history.push(`/items/${btoa(item.id)}`);
	};

	return (
		<div className="Items">
			<div className="Items-list">
				<ItemView onClickItem={handleClickItem}/>
			</div>
			<div className="Items-info">
				{children}
			</div>
		</div>
	);
}
