import FullDate from './FullDate';
import { Fragment } from 'react';
import { diffsFromItemHistory } from '../data/history';

export default function ItemHistory({ history, onClickItemHistory }) {
	const diffs = diffsFromItemHistory(history);

	return (
		<table className="ItemHistory CompactTable CompactTable--stripe CompactTable--hover">
			<tbody>
				{diffs.map(({ id, date, changes }) => (
					<Fragment key={`${id}-${date}`}>
						{changes.map(({ path, desc }) => (
							<tr key={path.join('-')} onClick={() => onClickItemHistory(date)}>
								<td>
									<div className="CompactTable-item CompactTable-item--autowrap CompactTable-item--small">
										<p>{desc}</p>
									</div>
								</td>
								<td>
									<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
										<p><FullDate date={date}/></p>
									</div>
								</td>
							</tr>
						))}
					</Fragment>
				))}
			</tbody>
		</table>
	);
}
