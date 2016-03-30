import React, { PropTypes } from 'react';
import ReactCSS from 'reactcss';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { panelHeaderButtonCenter } from '../styles/bootstrap';

export default class SidebarItem extends ReactCSS.Component {
	static contextTypes = {
		location: PropTypes.object.isRequired,
	};

	relativePath(path) {
		return `${this.context.location.pathname.split('/').slice(0, -1).join('/')}/${path}`;
	}

	classes() {
		return {
			default: {
				tabSelect: {
					...panelHeaderButtonCenter,
				},
			},
		};
	}

	render() {
		return (
			<Panel
				header={
					<ButtonGroup
						is="tabSelect"
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
