import Provider from './Provider';
import React from 'react';
import LinkButton from './LinkButton';
import { useMutationAddProvider, useQueryProviders } from '../data/queries';

export default function ProviderList() {
	const { isLoading, data: providers } = useQueryProviders();

	const mutation = useMutationAddProvider();

	if (isLoading) {
		return null;
	}

	const handleAddProvider = () => {
		mutation.mutate();
	};

	return (
		<fieldset className="ProviderList">
			<legend>
				<LinkButton onClick={handleAddProvider}>
					{'Add Provider'}
				</LinkButton>
			</legend>
			{providers.map(provider => (
				<Provider
					key={provider.id}
					provider={provider}
				/>
			))}
		</fieldset>
	);
}
