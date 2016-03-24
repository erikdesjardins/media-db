import React from 'react';
import ReactCSS from 'reactcss';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';
import { Input, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';

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
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="items">
							<img is="img" src={icon}/>
							{packageName}
						</Link>
					</Navbar.Brand>
				</Navbar.Header>
				<Nav>
					<li><Link to="providers">{'Providers'}</Link></li>
					<li><Link to="storage">{'Storage'}</Link></li>
				</Nav>
				<Navbar.Form pullRight>
					<Input type="text" placeholder="Search"/>
				</Navbar.Form>
			</Navbar>
		);
	}
}
