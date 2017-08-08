import React from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
			<Panel
				style={this.styles.panel}
				header={
					<ButtonGroup
						style={this.styles.tabSelect}
						bsSize="xsmall"
					>
						<LinkContainer to={this.relativePath('info')}>
							<Button>{'Info'}</Button>
						</LinkContainer>
						<LinkContainer to={this.relativePath('history')}>
							<Button>{'History'}</Button>
						</LinkContainer>
					</ButtonGroup>
				}
			>
				{this.props.children}
			</Panel>
		);
	}
}
