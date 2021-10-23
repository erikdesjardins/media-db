import React from 'react';

export default class CenteredColumn extends React.PureComponent {
	render() {
		return (
			<div className="CenteredColumn">
				<div className="CenteredColumn-content">
					{this.props.children}
				</div>
			</div>
		);
	}
}
