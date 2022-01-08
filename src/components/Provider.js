import { useMutationRemoveProvider, useMutationUpdateProvider } from '../data/queries';
import AutosaveInput from './AutosaveInput';
import LinkButton from './LinkButton';

export default function Provider({ provider }) {
	const updateMutation = useMutationUpdateProvider(provider.id);
	const removeMutation = useMutationRemoveProvider(provider.id);

	const handleSave = value => {
		updateMutation.mutate({ infoCallback: value });
	};
	const handleRemove = () => {
		removeMutation.mutate();
	};

	return (
		<div className="Provider">
			<LinkButton
				className="Provider-removeButton"
				onClick={handleRemove}
			>
				{'Remove'}
			</LinkButton>
			<AutosaveInput
				className="Provider-textarea"
				type="textarea"
				rows={16}
				defaultValue={provider.infoCallback}
				onSave={handleSave}
			/>
		</div>
	);
}
