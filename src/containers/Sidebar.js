import React from 'react';
import SidebarItem from '../components/SidebarItem';

export default function Sidebar({ location, children }) {
	return (
		<SidebarItem pathname={location.pathname}>
			{children}
		</SidebarItem>
	);
}
