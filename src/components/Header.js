import React from 'react';
import PropTypes from 'prop-types';
import { name as packageName } from '../../package.json';
import icon from '../images/icon32.png';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Nav from 'react-bootstrap/es/Nav';
import NavItem from 'react-bootstrap/es/NavItem';
import Navbar from 'react-bootstrap/es/Navbar';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends React.PureComponent {
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
		this.context.router.push(`/search/${btoa(e.target.value)}/preview`);
	};

	handleSubmitSearch = e => {
		e.preventDefault();
		this.context.router.push(`/search/${btoa(this.state.query)}/full`);
	};

	styles = {
		img: {
			display: 'inline',
			margin: '-6px 10px -6px 0',
		},
	};

	render() {
		return (
			<Navbar staticTop collapseOnSelect>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to="/items">
							<img style={this.styles.img} src={icon}/>
							{packageName}
						</Link>
					</Navbar.Brand>
					<Navbar.Toggle/>
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<LinkContainer to="/providers"><NavItem>{'Providers'}</NavItem></LinkContainer>
						<LinkContainer to="/storage"><NavItem>{'Storage'}</NavItem></LinkContainer>
					</Nav>
					<Navbar.Form pullRight>
						<form onSubmit={this.handleSubmitSearch}>
							<FormGroup>
								<FormControl
									type="text"
									placeholder="Search"
									autoFocus
									value={this.state.query}
									onChange={this.handleChangeSearch}
								/>
							</FormGroup>
						</form>
					</Navbar.Form>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
