import React, { PropTypes } from 'react';
import { markdown } from 'snudown-js';

export default class Markdown extends React.Component {
	static propTypes = {
		text: PropTypes.string.isRequired,
	};

	renderHtml() {
		return { __html: markdown(this.props.text) };
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={this.renderHtml()}></div> // eslint-disable-line react/no-danger
		);
	}
}
