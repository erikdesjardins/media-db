import React from 'react';
import { markdown } from 'snudown-js';

const isMarkdown = /[*_~^[&#]/;

export default React.memo(function Markdown({ source }) {
	return (isMarkdown.test(source) ?
		<div className="Markdown" dangerouslySetInnerHTML={{ __html: markdown(source) }}/> : // eslint-disable-line react/no-danger
		<div className="Markdown"><p>{source}</p></div>
	);
});
