import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import Floating from '../components/Floating';
import SearchList from '../components/SearchList';
import icon from '../images/icon32.png';

export default function Header() {
	const searchMatch = useMatch('/search/:query/*');
	const queryFromUrl = searchMatch && atob(searchMatch.params.query);
	const isSearch = !!searchMatch;

	const [query, setQuery] = useState(queryFromUrl || '');
	const [prevQueryFromUrl, setPrevQueryFromUrl] = useState(queryFromUrl || '');
	// if url changes, update query to match
	if (queryFromUrl !== prevQueryFromUrl) {
		if (queryFromUrl) setQuery(queryFromUrl);
		setPrevQueryFromUrl(queryFromUrl);
	}

	const [showPreview, setShowPreview] = useState(false);

	const navigate = useNavigate();

	const handleFocusSearch = () => {
		if (query) {
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

	// don't show the preview if the search page already has the same results
	const showPreviewForReal = showPreview && query !== queryFromUrl;

	return (
		<div className="Header">
			<header className="Header-header">
				<nav>
					<Link to="#"><img className="Header-img" src={icon}/></Link>
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
						className={classNames({ 'Floating-externalElement--showAboveOverlay': showPreviewForReal })}
						placeholder="Search"
						autoFocus
						value={query}
						onFocus={handleFocusSearch}
						onChange={handleChangeSearch}
					/>
					{showPreviewForReal ?
						<Floating top right onBlur={handleBlurPreview}>
							<SearchList query={query} preview onClickItem={handleClickItem}/>
						</Floating> :
						null
					}
				</form>
			</header>
		</div>
	);
}
