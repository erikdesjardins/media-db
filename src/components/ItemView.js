import { useState } from 'react';
import * as statusTypes from '../constants/statusTypes';
import { ROW_LIMIT } from '../constants/table';
import { useQueryItemsWithStatus } from '../data/queries';
import { roundDownToMultiple } from '../utils/math';
import ItemList from './ItemList';
import LinkButton from './LinkButton';
import SelectBar from './SelectBar';

export default function ItemView({ onClickItem }) {
	const [status, setStatus] = useState(statusTypes.IN_PROGRESS);
	const [offset, setOffset] = useState(0);

	const { isLoading, isFetching, data: items } = useQueryItemsWithStatus(status, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	const handleStatusChange = status => {
		setStatus(status);
		setOffset(0);
	};

	const hasPrev = !isFetching && offset > 0;
	const hasNext = !isFetching && offset + ROW_LIMIT < items.length;

	const handlePrev = () => setOffset(offset => offset - ROW_LIMIT);
	const handleNext = () => setOffset(offset => offset + ROW_LIMIT);
	const handleFirst = () => setOffset(0);
	const handleLast = () => setOffset(roundDownToMultiple(items.length - 1, ROW_LIMIT));

	return (
		<fieldset className="ItemView Utils-fieldset--noPadding">
			<legend className="ItemView-controls">
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
				{' | '}
				<span>
					<LinkButton disabled={!hasPrev} onClick={handleFirst}>
						{'First'}
					</LinkButton>
					{' '}
					<LinkButton disabled={!hasPrev} onClick={handlePrev}>
						{'<<<'}
					</LinkButton>
					{' '}
					<LinkButton disabled={!hasNext} onClick={handleNext}>
						{'>>>'}
					</LinkButton>
					{' '}
					<LinkButton disabled={!hasNext} onClick={handleLast}>
						{'Last'}
					</LinkButton>
				</span>
			</legend>
			<ItemList items={items.slice(offset, offset + ROW_LIMIT)} onClickItem={onClickItem}/>
		</fieldset>
	);
}
