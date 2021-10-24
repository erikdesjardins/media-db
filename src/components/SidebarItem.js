import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function SidebarItem({ children }) {
	const params = useParams();

	return (
		<fieldset className="SidebarItem">
			<legend className="SidebarItem-legend">
				<Link to={`/items/${params.id}/info`}>
					{'Info'}
				</Link>
				{' '}
				<Link to={`/items/${params.id}/history`}>
					{'History'}
				</Link>
			</legend>
			{children}
		</fieldset>
	);
}
