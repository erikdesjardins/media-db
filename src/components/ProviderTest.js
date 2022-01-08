import { useState } from 'react';
import classNames from 'classnames';
import { useQueryItemFromProvider } from '../data/queries';

export default function ProviderTest() {
	const [url, setUrl] = useState('');

	const { isLoading, isError, error, isPreviousData, isRefetching, data: itemFromProvider } =
		useQueryItemFromProvider(url, { keepPreviousData: true });

	const handleChange = e => {
		setUrl(e.target.value);
	};

	let output;
	if (isLoading) {
		output = null;
	} else if (isError) {
		output = (
			<>
				<h3>{'Error'}</h3>
				<code>{error.message}</code>
			</>
		);
	} else {
		output = (
			<>
				<h3>{'Output'}</h3>
				<code>{JSON.stringify(itemFromProvider, null, 2)}</code>
			</>
		);
	}

	return (
		<fieldset className="ProviderTest">
			<legend>
				{'Test providers'}
			</legend>
			<input
				className="ProviderTest-url"
				type="text"
				placeholder="URL"
				value={url}
				onChange={handleChange}
			/>
			<div className={classNames('ProviderTest-output', { 'ProviderTest-output--stale': isPreviousData || isRefetching })}>
				{output}
			</div>
		</fieldset>
	);
}
