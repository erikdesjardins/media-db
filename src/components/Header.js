import React from 'react';
import ReactCSS from 'reactcss';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';

const indexPath = 'index.html';

export default class Header extends ReactCSS.Component {
	classes() {
		return {
			default: {
				header: {
					width: '100%',
					backgroundColor: '#b689c8',
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
					<a href={indexPath}>
						<img src={icon}/>
					</a>
				</div>
				<div is="title">
					<a href={indexPath}>
						{packageName}
					</a>
				</div>
			</div>
		);
	}
}
