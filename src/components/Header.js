import React from 'react';
import ReactCSS from 'reactcss';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';

export default class Header extends ReactCSS.Component {
	classes() {
		return {
			default: {
				header: {
					width: '100%',
					backgroundColor: '#50205d',
					display: 'flex',
					alignItems: 'center',
				},
				img: {
					padding: '5px',
				},
				title: {
					fontSize: 'large',
				},
			},
		};
	}

	render() {
		return (
			<div is="header">
				<div is="img">
					<img src={icon}/>
				</div>
				<div is="title">
					{packageName}
				</div>
			</div>
		);
	}
}
