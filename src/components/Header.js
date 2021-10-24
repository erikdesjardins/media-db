import React, { useState } from 'react';
import icon from '../images/icon32.png';
import { Link, useHistory } from 'react-router-dom';
import CenteredColumn from './CenteredColumn';

export default function Header() {
	const [query, setQuery] = useState('');

	const history = useHistory();

	const handleChangeSearch = e => {
		setQuery(e.target.value);
		history.push(`/search/${btoa(e.target.value)}/preview`);
	};

	const handleSubmitSearch = e => {
		e.preventDefault();
		history.push(`/search/${btoa(query)}/full`);
	};

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
				<form onSubmit={handleSubmitSearch}>
					<input
						type="text"
						placeholder="Search"
						autoFocus
						value={query}
						onChange={handleChangeSearch}
					/>
				</form>
			</header>
		</CenteredColumn>
	);
}
