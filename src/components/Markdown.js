import React, { PropTypes } from 'react';
import { markdown } from 'snudown-js';

export default class Markdown extends React.PureComponent {
	static propTypes = {
		source: PropTypes.string.isRequired,
	};

	renderHtml() {
		return { __html: markdown(this.props.source) };
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={this.renderHtml()}/> // eslint-disable-line react/no-danger
		);
	}
}
