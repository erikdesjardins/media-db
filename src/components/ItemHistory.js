import _ from 'lodash';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { diff } from 'deep-diff';
import { formatDate } from '../utils/format';
import { intersperse } from '../utils/array';

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
			`created on ${formatDate(history[0].date)}`,
			..._.zipWith(history.slice(0, -1), history.slice(1), (from, to) => `${
				diff(from, to, (path, key) => key === 'date' || String(key).charAt(0) === '_')
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
								return `changed ${prefix}: ${lhs} -> ${rhs}`;
							case 'A':
							default:
								return 'pls no';
						}
					})
					.join(', and ')
			} on ${formatDate(to.date)}`),
		]::intersperse(<br/>);

		return (
			<div>
				{diffs}
			</div>
		);
	}
}
