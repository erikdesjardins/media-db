import _ from 'lodash-es';
import React from 'react';
import deepDiff from 'deep-diff';
import { formatFullDate } from '../utils/formatDate';

export default function ItemHistory({ history }) {
	const diffs = [
		{
			description: 'created',
			date: history[0].date,
		},
		..._.flatten(_.zipWith(history.slice(0, -1), history.slice(1), (from, to) => {
			const diff = deepDiff(from, to, (path, key) => key === 'date' || String(key).startsWith('_'));

			if (!diff) {
				return [{
					description: 'no change',
					date: to.date,
				}];
			}

			return diff
				.map(({ kind, path, lhs, rhs, item }) => {
					const isArray = kind === 'A';
					const prefix = `${isArray ? 'a ' : ''}${path.join('.')}`;
					if (isArray) {
						({ kind, lhs, rhs } = item); // eslint-disable-line no-param-reassign
					}
					switch (kind) {
						case 'N':
							return `added ${prefix}: ${rhs}`;
						case 'D':
							return `removed ${prefix}: ${lhs}`;
						case 'E':
							return `changed ${prefix}: ${lhs} → ${rhs}`;
						case 'A':
						default:
							return 'pls no';
					}
				})
				.map(description => ({
					description,
					date: to.date,
				}));
		})),
	];

	return (
		<table className="ItemHistory CompactTable CompactTable--stripe">
			<tbody>
				{diffs.map(({ description, date }, i) => (
					// ensures React keys are unique
					// this is fine because items can only be appended to history
					// eslint-disable-next-line react/no-array-index-key
					<tr key={date + i}>
						<td>
							<div className="CompactTable-item CompactTable-item--autowrap CompactTable-item--small">
								<p>{description}</p>
							</div>
						</td>
						<td>
							<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
								<p>{formatFullDate(date)}</p>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
