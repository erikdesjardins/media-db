import React from 'react';
import ReactCSS from 'reactcss';

export default class Footer extends ReactCSS.Component {
	classes() {
		return {
			default: {
				spacer: {
					marginTop: '20px',
				},
			},
		};
	}

	render() {
		return (
			<div is="spacer"/>
		);
	}
}
