import React, { PropTypes } from 'react';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';
import { Input, Nav, NavItem, Navbar } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

// *sigh*
const NavbarBrand = Navbar.Brand;
const NavbarForm = Navbar.Form;
const NavbarHeader = Navbar.Header;

export default class Header extends React.Component {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	state = {
		query: '',
	};

	handleChangeSearch = e => {
		this.setState({
			query: e.target.value,
		});
		this.context.router.push({
			pathname: `/search/${encodeURIComponent(e.target.value)}`,
			query: { preview: true },
		});
	};

	handleSubmitSearch = e => {
		e.preventDefault();
		this.context.router.push({
			pathname: `/search/${encodeURIComponent(this.state.query)}`,
			query: {},
		});
	};

	render() {
		const styles = {
			img: {
				display: 'inline',
				margin: '-6px 10px -6px 0',
			},
		};

		return (
			<Navbar staticTop>
				<NavbarHeader>
					<NavbarBrand>
						<Link to="/items">
							<img style={styles.img} src={icon}/>
							{packageName}
						</Link>
					</NavbarBrand>
				</NavbarHeader>
				<Nav>
					<LinkContainer to="/providers"><NavItem>{'Providers'}</NavItem></LinkContainer>
					<LinkContainer to="/storage"><NavItem>{'Storage'}</NavItem></LinkContainer>
				</Nav>
				<NavbarForm pullRight>
					<form onSubmit={this.handleSubmitSearch}>
						<Input
							type="text"
							placeholder="Search"
							value={this.state.query}
							onChange={this.handleChangeSearch}
						/>
					</form>
				</NavbarForm>
			</Navbar>
		);
	}
}
