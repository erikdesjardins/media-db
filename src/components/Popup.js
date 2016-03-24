import React from 'react';

const indexPath = 'index.html';

export default class Popup extends React.Component {
	render() {
		return (
			<a href={indexPath}>{'index'}</a>
		);
	}
}
