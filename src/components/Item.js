import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { formatDate, formatNumber } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				title
				creator
				genres
				characters
				notes
				date
				length
			}
		`,
	},
})
export default class Item extends React.Component {
	render() {
		const { item: { title, creator, genres, characters, notes, date, length } } = this.props;
		return (
			<tr>
				<td>{title}</td>
				<td>{creator}</td>
				<td>{genres.join(', ')}</td>
				<td>{characters.join(', ')}</td>
				<td>{notes}</td>
				<td>{formatDate(date)}</td>
				<td>{formatNumber(length)}</td>
			</tr>
		);
	}
}
