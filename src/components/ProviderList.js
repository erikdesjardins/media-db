import { useMutationAddProvider, useQueryProviders } from '../data/queries';
import LinkButton from './LinkButton';
import Provider from './Provider';

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
					{'Add new provider'}
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
