import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/es/Button';
import ButtonGroup from 'react-bootstrap/es/ButtonGroup';
import Panel from 'react-bootstrap/es/Panel';
import { Link } from 'found';
import { panelHeaderButtonCenter } from '../styles/bootstrap';

export default class SidebarItem extends React.PureComponent {
	static propTypes = {
		pathname: PropTypes.string.isRequired,
	};

	relativePath(path) {
		return `${this.props.pathname.split('/').slice(0, -1).join('/')}/${path}`;
	}

	styles = {
		panel: {
			overflow: 'hidden',
		},
		tabSelect: {
			...panelHeaderButtonCenter,
		},
	};

	render() {
		return (
			<Panel style={this.styles.panel}>
				<Panel.Heading>
					<Panel.Title>
						<ButtonGroup
							style={this.styles.tabSelect}
							bsSize="xsmall"
						>
							<Link to={this.relativePath('info')} Component={Button} activePropName="active">
								{'Info'}
							</Link>
							<Link to={this.relativePath('history')} Component={Button} activePropName="active">
								{'History'}
							</Link>
						</ButtonGroup>
					</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					{this.props.children}
				</Panel.Body>
			</Panel>
		);
	}
}
