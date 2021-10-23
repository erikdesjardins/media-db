import React from 'react';
import SidebarItem from '../components/SidebarItem';

export default class Sidebar extends React.PureComponent {
	render() {
		return (
			<SidebarItem pathname={this.props.location.pathname}>
				{this.props.children}
			</SidebarItem>
		);
	}
}
