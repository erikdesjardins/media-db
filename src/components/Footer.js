import React from 'react';

export default class Footer extends React.PureComponent {
	styles = {
		spacer: {
			marginTop: '20px',
		},
	};

	render() {
		return (
			<div style={this.styles.spacer}/>
		);
	}
}
