import React, { PropTypes } from 'react';
import { Button, ButtonGroup, Panel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { panelHeaderButtonCenter } from '../styles/bootstrap';

export default class SidebarItem extends React.Component {
	static propTypes = {
		pathname: PropTypes.string.isRequired,
	};

	relativePath(path) {
		return `${this.props.pathname.split('/').slice(0, -1).join('/')}/${path}`;
	}

	render() {
		const styles = {
			panel: {
				overflow: 'hidden',
			},
			tabSelect: {
				...panelHeaderButtonCenter,
			},
		};

		return (
			<Panel
				style={styles.panel}
				header={
					<ButtonGroup
						style={styles.tabSelect}
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
