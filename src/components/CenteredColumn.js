import React from 'react';
import classNames from 'classnames';

export default class CenteredColumn extends React.PureComponent {
	render() {
		return (
			<div className={classNames('CenteredColumn', this.props.className)}>
				<div className="CenteredColumn-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}
