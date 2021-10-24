import ItemView from '../components/ItemView';
import React from 'react';

export default function Items({ children }) {
	return (
		<div className="Items">
			<div className="Items-list">
				<ItemView/>
			</div>
			<div className="Items-info">
				{children}
			</div>
		</div>
	);
}
