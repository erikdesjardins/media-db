import _ from 'lodash-es';
import React from 'react';
import deepDiff from 'deep-diff';
import FullDate from './FullDate';

export default function ItemHistory({ history }) {
	const diffs = [
		{
			id: history[0].id,
			description: 'created',
			date: history[0].date,
		},
		..._.zipWith(history.slice(0, -1), history.slice(1), (from, to) => {
			const ignoreFields = ['id', 'statusDate', 'date'];
			const diff = deepDiff(from, to, (path, key) => ignoreFields.includes(key));

			if (!diff) {
				return [{
					id: to.id,
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
							return [path, `added ${prefix}: ${rhs}`];
						case 'D':
							return [path, `removed ${prefix}: ${lhs}`];
						case 'E':
							return [path, `changed ${prefix}: ${lhs} → ${rhs}`];
						case 'A':
						default:
							return [path, 'pls no'];
					}
				})
				.map(([path, description]) => ({
					id: `${to.id}-${path.join('-')}`,
					description,
					date: to.date,
				}));
		}).flat(),
	];

	return (
		<table className="ItemHistory CompactTable CompactTable--stripe">
			<tbody>
				{diffs.map(({ id, description, date }) => (
					<tr key={id}>
						<td>
							<div className="CompactTable-item CompactTable-item--autowrap CompactTable-item--small">
								<p>{description}</p>
							</div>
						</td>
						<td>
							<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
								<p><FullDate date={date}/></p>
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
