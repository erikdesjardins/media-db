import * as statusTypes from '../constants/statusTypes';
import { useMutationUpdateItem } from '../data/queries';
import SelectBar from './SelectBar';

export default function ItemStatus({ item }) {
	const mutation = useMutationUpdateItem(item.id);

	const handleSave = value => {
		mutation.mutate({ status: value });
	};

	return (
		<div className="ItemStatus">
			<h3>
				{'Status'}
			</h3>
			<div>
				<SelectBar
					selected={item.status}
					onSelect={handleSave}
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
			</div>
		</div>
	);
}
