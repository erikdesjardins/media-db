import ItemList from './ItemList';
import React, { useState } from 'react';
import SelectBar from './SelectBar';
import * as statusTypes from '../constants/statusTypes';
import LinkButton from './LinkButton';
import { useQueryItemsFilter } from '../data/queries';

const LIMIT = 25;

export default function ItemView() {
	const [status, setStatus] = useState(statusTypes.IN_PROGRESS);
	const [offset, setOffset] = useState(0);

	const { isLoading, isFetching, data: items } = useQueryItemsFilter({ status }, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	const handleStatusChange = status => {
		setStatus(status);
		setOffset(0);
	};

	const hasPrev = !isFetching && offset > 0;
	const hasNext = !isFetching && offset + LIMIT < items.length;

	const handlePrev = () => setOffset(offset => offset - LIMIT);
	const handleNext = () => setOffset(offset => offset + LIMIT);

	return (
		<fieldset className="ItemView">
			<legend className="ItemView-legend">
				<SelectBar
					selected={status}
					onSelect={handleStatusChange}
					options={[{
						value: statusTypes.WAITING,
						name: 'Waiting',
					}, {
						value: statusTypes.PENDING,
						name: 'Pending',
					}, {
						value: statusTypes.IN_PROGRESS,
						name: 'In Progress',
					}, {
						value: statusTypes.COMPLETE,
						name: 'Complete',
					}, {
						value: statusTypes.REJECTED,
						name: 'Rejected',
					}]}
				/>
			</legend>
			<div className="ItemView-nextPrev">
				<LinkButton disabled={!hasPrev} onClick={handlePrev}>
					{'<--'}
				</LinkButton>
				{' '}
				<LinkButton disabled={!hasNext} onClick={handleNext}>
					{'-->'}
				</LinkButton>
			</div>
			<ItemList items={items.slice(offset, offset + LIMIT)}/>
		</fieldset>
	);
}
