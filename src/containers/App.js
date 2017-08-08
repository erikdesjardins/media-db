import Header from '../components/Header';
import React from 'react';

export default class App extends React.PureComponent {
	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
			</div>
		);
	}
}
