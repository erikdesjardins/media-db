import React from 'react';
import PropTypes from 'prop-types';
import { markdown } from 'snudown-js';

const isMarkdown = /[*_~^[&#]/;

export default class Markdown extends React.PureComponent {
	static propTypes = {
		source: PropTypes.string.isRequired,
	};

	render() {
		return (isMarkdown.test(this.props.source) ?
			<div dangerouslySetInnerHTML={{ __html: markdown(this.props.source) }}/> : // eslint-disable-line react/no-danger
			<div><p>{this.props.source}</p></div>
		);
	}
}
