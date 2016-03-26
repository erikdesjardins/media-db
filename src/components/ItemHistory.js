import _ from 'lodash';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { diff } from 'deep-diff';
import { formatDate } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				history,
			}
		`,
	},
})
export default class ItemHistory extends React.Component {
	render() {
		const { item: { history } } = this.props;

		const diffs = [
			`created on ${formatDate(history[0].date)}`,
			..._.zipWith(history.slice(0, -1), history.slice(1), (from, to) => `${
				diff(from, to)
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
		];

		return (
			<div>
				{diffs}
			</div>
		);
	}
}
