import React from 'react';
import { Link } from 'react-router';

export default function SidebarItem({ pathname, children }) {
	const basePath = pathname.split('/').slice(0, -1).join('/');

	return (
		<fieldset className="SidebarItem">
			<legend className="SidebarItem-legend">
				<Link to={`${basePath}/info`}>
					{'Info'}
				</Link>
				{' '}
				<Link to={`${basePath}/history`}>
					{'History'}
				</Link>
			</legend>
			{children}
		</fieldset>
	);
}
