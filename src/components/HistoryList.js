import { diffsFromItemHistory } from '../data/history';
import { useQueryItemHistory } from '../data/queries';
import { last } from '../utils/array';
import FullDate from './FullDate';

export default function HistoryList({ itemId: id, selectedDate, onClickItemHistory }) {
	const { isLoading, data: history } = useQueryItemHistory(id, { keepPreviousData: true });

	if (isLoading) {
		return null;
	}

	const diffs = diffsFromItemHistory(history);

	return (
		<fieldset className="HistoryList Utils-fieldset--noPadding">
			<legend className="HistoryList-legend">
				{'History for'}
				{' '}
				{last(history).title}
			</legend>
			<table className="CompactTable CompactTable--stripe CompactTable--hover CompactTable--alignColumnsForHistoryList">
				<tbody>
					{diffs.map(({ id, date, changes }) => (
						<tr key={`${id}-${date}`} onClick={() => onClickItemHistory(date)}>
							<td>
								<div className="CompactTable-item CompactTable-item--small">
									{changes.map(({ path, desc }) => (
										<p key={path.join('-')}>
											{desc}
										</p>
									))}
								</div>
							</td>
							<td>
								<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
									<p><FullDate date={date}/></p>
								</div>
							</td>
							<td>
								<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
									<p>
										{date === selectedDate &&
											'<<<'
										}
									</p>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</fieldset>
	);
}
