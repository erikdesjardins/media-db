import Header from '../components/Header';
import React from 'react';

export default function App({ children }) {
	return (
		<div className="App">
			<Header/>
			{children}
		</div>
	);
}
