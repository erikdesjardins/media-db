import React, { useState } from 'react';
import icon from '../images/icon32.png';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import CenteredColumn from '../components/CenteredColumn';

export default function Header() {
	const match = useRouteMatch('/search/:query');
	const queryFromUrl = match && atob(match.params.query);

	// eslint-disable-next-line prefer-const
	let [query, setQuery] = useState(queryFromUrl || '');

	if (queryFromUrl && queryFromUrl !== query) {
		setQuery(queryFromUrl);
		query = queryFromUrl;
	}

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
