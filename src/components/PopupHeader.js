import React from 'react';
import ReactCSS from 'reactcss';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';
import { Navbar } from 'react-bootstrap';

// *sigh*
const NavbarBrand = Navbar.Brand;
const NavbarHeader = Navbar.Header;

const indexPath = 'index.html';

export default class PopupHeader extends ReactCSS.Component {
	classes() {
		return {
			default: {
				img: {
					display: 'inline',
					margin: '-6px 10px -6px 0',
				},
			},
		};
	}

	render() {
		return (
			<Navbar staticTop>
				<NavbarHeader>
					<NavbarBrand>
						<a href={indexPath}>
							<img is="img" src={icon}/>
							{packageName}
						</a>
					</NavbarBrand>
				</NavbarHeader>
			</Navbar>
		);
	}
}
