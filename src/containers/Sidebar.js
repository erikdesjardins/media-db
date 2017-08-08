import React from 'react';
import PropTypes from 'prop-types';
import SidebarItem from '../components/SidebarItem';

export default class Sidebar extends React.PureComponent {
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
