import React from 'react';
import SidebarItem from '../components/SidebarItem';

export default function Sidebar({ children }) {
	return (
		<SidebarItem>
			{children}
		</SidebarItem>
	);
}
