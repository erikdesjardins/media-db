import _ from 'lodash';
import React, { PropTypes } from 'react';
import ReactCSS from 'reactcss';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';
import { Input, Nav, NavItem, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

// *sigh*
const NavbarBrand = Navbar.Brand;
const NavbarForm = Navbar.Form;
const NavbarHeader = Navbar.Header;

export default class Header extends ReactCSS.Component {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	handleSearchInput = _.debounce(query => {
		if (!query) return;
		this.context.router.push(`/search/${query}`);
	}, 1000);

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
						<Link to="/items">
							<img is="img" src={icon}/>
							{packageName}
						</Link>
					</NavbarBrand>
				</NavbarHeader>
				<Nav>
					<LinkContainer to="/providers"><NavItem>{'Providers'}</NavItem></LinkContainer>
					<LinkContainer to="/storage"><NavItem>{'Storage'}</NavItem></LinkContainer>
				</Nav>
				<NavbarForm pullRight>
					<Input type="text" placeholder="Search" onInput={e => this.handleSearchInput(e.target.value)}/>
				</NavbarForm>
			</Navbar>
		);
	}
}
