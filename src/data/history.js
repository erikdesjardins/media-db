import deepDiff from 'deep-diff';
import { zipWith } from '../utils/array';

export function diffsFromItemHistory(history) {
	return [
		{
			id: history[0].id,
			date: history[0].date,
			changes: [{
				path: [],
				desc: 'created',
			}],
		},
		...zipWith(history.slice(0, -1), history.slice(1), (from, to) => {
			const ignoreFields = ['id', 'statusDate', 'date'];
			const diff = deepDiff(from, to, (path, key) => ignoreFields.includes(key));

			if (!diff) {
				return {
					id: to.id,
					date: to.date,
					changes: [{
						path: [],
						desc: 'no change',
					}],
				};
			}

			const changes = diff.map(({ kind, path, lhs, rhs, item }) => {
				const isArray = kind === 'A';
				const prefix = `${isArray ? 'a ' : ''}${path.join('.')}`;
				if (isArray) {
					({ kind, lhs, rhs } = item); // eslint-disable-line no-param-reassign
				}
				switch (kind) {
					case 'N':
						return { path, desc: `added ${prefix}: ${rhs}` };
					case 'D':
						return { path, desc: `removed ${prefix}: ${lhs}` };
					case 'E':
						return { path, desc: `changed ${prefix}: ${lhs} → ${rhs}` };
					case 'A':
					default:
						return { path, desc: 'pls no' };
				}
			});

			return {
				id: to.id,
				date: to.date,
				changes,
			};
		}),
	];
}
