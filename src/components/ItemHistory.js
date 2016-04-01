import _ from 'lodash';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { diff as deepDiff } from 'deep-diff';
import { formatDate } from '../utils/format';

@relay({
	initialVariables: {
		first: 2147483647,
	},
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				history(first: $first) {
					edges {
						node {
							url,
							thumbnail,
							title,
							creator,
							genres,
							characters,
							notes,
							tags,
							length,
							status,
							productionStatus,
							date,
						}
					}
				}
			}
		`,
	},
})
export default class ItemHistory extends React.Component {
	render() {
		const history = this.props.item.history.edges.map(edge => edge.node);

		const diffs = [
			['created', formatDate(history[0].date)],
			..._.zipWith(history.slice(0, -1), history.slice(1), (from, to) => {
				const diff = deepDiff(from, to, (path, key) => key === 'date' || String(key).startsWith('_'));

				if (!diff) {
					return ['no change', to.date];
				}

				const description = diff
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
					.join(', and ');

				return [description, to.date];
			}),
		];

		return (
			<table className="CompactTable CompactTable--stripe">
				<tbody>
					{diffs.map(([description, date]) =>
						<tr key={date}>
							<td>
								<div className="CompactTable-item CompactTable-item--autowrap">
									<p>{description}</p>
								</div>
							</td>
							<td>
								<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
									<p>{formatDate(date)}</p>
								</div>
							</td>
						</tr>
					)}
				</tbody>
			</table>
		);
	}
}
