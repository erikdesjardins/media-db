import React from 'react';
import { markdown } from 'snudown-js';

const isMarkdown = /[*_~^[&#]/;

export default React.memo(function Markdown({ source, inline = false }) {
	if (!isMarkdown.test(source)) {
		return (inline ?
			<span className="Markdown">{source}</span> :
			<div className="Markdown"><p>{source}</p></div>
		);
	}

	/* eslint-disable react/no-danger */
	return (inline ?
		<span className="Markdown" dangerouslySetInnerHTML={{ __html: markdown(source).slice('<p>'.length, -'</p>\n'.length) }}/> :
		<div className="Markdown" dangerouslySetInnerHTML={{ __html: markdown(source) }}/>
	);
});
