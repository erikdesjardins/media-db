import React from 'react';
import icon from '../images/icon32.png';
import { Link } from 'react-router';
import CenteredColumn from './CenteredColumn';

export default class Header extends React.Component {
	constructor(...args) {
		super(...args);

		this.state = {
			query: '',
		};

		this.handleChangeSearch = e => {
			this.setState({
				query: e.target.value,
			});
			this.context.router.push(`/search/${btoa(e.target.value)}/preview`);
		};

		this.handleSubmitSearch = e => {
			e.preventDefault();
			this.context.router.push(`/search/${btoa(this.state.query)}/full`);
		};
	}

	render() {
		return (
			<CenteredColumn className="Header">
				<header className="Header-header">
					<nav>
						<Link to="/items"><img className="Header-img" src={icon}/></Link>
						{' '}
						<Link to="/items">{'Home'}</Link>
						{' '}
						<Link to="/providers">{'Providers'}</Link>
						{' '}
						<Link to="/storage">{'Storage'}</Link>
					</nav>
					<div className="Utils-flexSpacer"/>
					<form onSubmit={this.handleSubmitSearch}>
						<input
							type="text"
							placeholder="Search"
							autoFocus
							value={this.state.query}
							onChange={this.handleChangeSearch}
						/>
					</form>
				</header>
			</CenteredColumn>
		);
	}
}

Header.contextTypes = {
	router: () => {},
};
