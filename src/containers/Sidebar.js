import React, { PropTypes } from 'react';
import SidebarItem from '../components/SidebarItem';

export default class Sidebar extends React.Component {
	static propTypes = {
		location: PropTypes.shape({
			pathname: SidebarItem.propTypes.pathname,
		}).isRequired,
	};

	render() {
		return (
			<SidebarItem pathname={this.props.location.pathname}>
				{this.props.children}
			</SidebarItem>
		);
	}
}
