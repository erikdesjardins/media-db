import Footer from '../components/Footer';
import Header from '../components/Header';
import React from 'react';

export default class App extends React.Component {
	render() {
		return (
			<div>
				<Header/>
				{this.props.children}
				<Footer/>
			</div>
		);
	}
}
