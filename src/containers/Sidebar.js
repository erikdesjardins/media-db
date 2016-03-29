import React from 'react';
import SidebarItem from '../components/SidebarItem';

export default class Sidebar extends React.Component {
	render() {
		return (
			<SidebarItem>
				{this.props.children}
			</SidebarItem>
		);
	}
}
