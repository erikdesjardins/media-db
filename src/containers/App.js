import Header from '../components/Header';
import React from 'react';

export default class App extends React.PureComponent {
	render() {
		return (
			<div className="App">
				<Header/>
				{this.props.children}
			</div>
		);
	}
}
