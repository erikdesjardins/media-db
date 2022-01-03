import { useCallback, useRef, useState } from 'react';
import icon from '../images/icon32.png';
import { Link, useNavigate, useMatch } from 'react-router-dom';
import CenteredColumn from '../components/CenteredColumn';
import SearchList from '../components/SearchList';
import Floating from '../components/Floating';

export default function Header() {
	const searchMatch = useMatch('/search/:query/*');
	const queryFromUrl = searchMatch && atob(searchMatch.params.query);
	const isSearch = !!searchMatch;

	// eslint-disable-next-line prefer-const
	let [query, setQuery] = useState(queryFromUrl || '');
	const [showPreview, setShowPreview] = useState(false);

	// if url changes, update query to match
	const previousQueryFromUrl = useRef(queryFromUrl);
	if (queryFromUrl && queryFromUrl !== previousQueryFromUrl.current && queryFromUrl !== query) {
		setQuery(queryFromUrl);
		query = queryFromUrl;
	}
	previousQueryFromUrl.current = queryFromUrl;

	// don't show the preview if the search page already has the same results
	const searchPageIsSameAsPreview = query === queryFromUrl;

	const navigate = useNavigate();

	const handleFocusSearch = () => {
		if (query && !searchPageIsSameAsPreview) {
			setShowPreview(true);
		}
	};

	const handleChangeSearch = e => {
		setQuery(e.target.value);
		setShowPreview(true);
	};

	const handleBlurPreview = () => {
		setShowPreview(false);
	};

	const handleClickItem = useCallback(item => {
		if (isSearch) {
			navigate(`/search/${btoa(queryFromUrl)}/${btoa(item.id)}`);
		} else {
			navigate(`/items/${btoa(item.id)}`);
		}
	}, [navigate, isSearch, queryFromUrl]);

	const handleSubmitSearch = e => {
		e.preventDefault();
		setShowPreview(false);
		navigate(`/search/${btoa(query)}`);
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
				<form className="Header-form" onSubmit={handleSubmitSearch}>
					<input
						type="text"
						placeholder="Search"
						autoFocus
						value={query}
						onFocus={handleFocusSearch}
						onChange={handleChangeSearch}
					/>
					{showPreview && !searchPageIsSameAsPreview &&
						<Floating top right onBlur={handleBlurPreview}>
							<SearchList query={query} preview onClickItem={handleClickItem}/>
						</Floating>
					}
				</form>
			</header>
		</CenteredColumn>
	);
}
