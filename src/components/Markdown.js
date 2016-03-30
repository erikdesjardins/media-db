import React, { PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { markdown } from 'snudown-js';

@pureRender
export default class Markdown extends React.Component {
	static propTypes = {
		source: PropTypes.string.isRequired,
	};

	renderHtml() {
		return { __html: markdown(this.props.source) };
	}

	render() {
		return (
			<div dangerouslySetInnerHTML={this.renderHtml()}></div> // eslint-disable-line react/no-danger
		);
	}
}
