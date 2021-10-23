import React from 'react';
import { Link } from 'react-router';

export default class SidebarItem extends React.PureComponent {
	relativePath(path) {
		return `${this.props.pathname.split('/').slice(0, -1).join('/')}/${path}`;
	}

	render() {
		return (
			<fieldset>
				<legend>
					<Link to={this.relativePath('info')}>
						{'Info'}
					</Link>
					{' '}
					<Link to={this.relativePath('history')}>
						{'History'}
					</Link>
				</legend>
				{this.props.children}
			</fieldset>
		);
	}
}
