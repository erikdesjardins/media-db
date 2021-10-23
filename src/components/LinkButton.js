import React from 'react';
import classNames from 'classnames';

export default class LinkButton extends React.PureComponent {
	handleClick = e => {
		e.preventDefault();
		if (!this.props.disabled) {
			this.props.onClick();
		}
	};

	render() {
		return (
			<a
				href={this.props.disabled ? null : '#'}
				title={this.props.title}
				className={classNames('LinkButton', this.props.className)}
				onClick={this.handleClick}
			>
				{this.props.children}
			</a>
		);
	}
}
