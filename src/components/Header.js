import React from 'react';
import ReactCSS from 'reactcss';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';
import { Input, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

// *sigh*
const NavbarBrand = Navbar.Brand;
const NavbarForm = Navbar.Form;
const NavbarHeader = Navbar.Header;

export default class Header extends ReactCSS.Component {
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
						<Link to="items">
							<img is="img" src={icon}/>
							{packageName}
						</Link>
					</NavbarBrand>
				</NavbarHeader>
				<Nav>
					<li><Link to="providers">{'Providers'}</Link></li>
					<li><Link to="storage">{'Storage'}</Link></li>
				</Nav>
				<NavbarForm pullRight>
					<Input type="text" placeholder="Search"/>
				</NavbarForm>
			</Navbar>
		);
	}
}
