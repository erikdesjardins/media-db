import { useQueryItemHistoryAt } from '../data/queries';
import FullDate from './FullDate';

export default function HistoryRaw({ itemId: id, date }) {
	const { isLoading, data: historyItem } = useQueryItemHistoryAt(id, date, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	return (
		<fieldset className="HistoryRaw">
			<legend>
				<FullDate date={historyItem.date}/>
			</legend>
			<code>
				{JSON.stringify(historyItem, null, 2)}
			</code>
		</fieldset>
	);
}
