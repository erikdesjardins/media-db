import React from 'react';
import ReactCSS from 'reactcss';
import { Jumbotron } from 'react-bootstrap';

export default class Footer extends ReactCSS.Component {
	classes() {
		return {
			default: {
				jumbotron: {
					marginTop: '20px',
					marginBottom: 0,
				},
			},
		};
	}

	render() {
		return (
			<Jumbotron is="jumbotron"/>
		);
	}
}
