import _ from 'lodash-es';
import deepEqual from 'only-shallow';
import React from 'react';
import LinkButton from './LinkButton';
import { useMutationUpdateItem, useQueryItemFromProvider } from '../data/queries';

export default function ItemRefreshButton({ item, fields, showLoadingIcon = true }) {
	const { isLoading, isError, error, data: itemFromProvider } = useQueryItemFromProvider(item.url);

	const mutation = useMutationUpdateItem(item.id);

	if (isError) {
		return (
			<span className="ItemRefreshButton" title={error.message}>
				{'❌'}
			</span>
		);
	}
	if (isLoading) {
		return (
			<span className="ItemRefreshButton">
				{showLoadingIcon ? '…' : null}
			</span>
		);
	}

	const relevantFieldsFromProvider = _.pick(itemFromProvider, fields);
	const anyFieldsChanged = Object.entries(relevantFieldsFromProvider).some(([key, value]) => !deepEqual(value, item[key]));

	if (!anyFieldsChanged) {
		return null;
	}

	const handleClick = () => {
		mutation.mutate(relevantFieldsFromProvider);
	};

	return (
		<LinkButton
			className="ItemRefreshButton"
			href="#"
			title={Object.values(relevantFieldsFromProvider).join(', ')}
			onClick={handleClick}
		>
			{'🔄'}
		</LinkButton>
	);
}
