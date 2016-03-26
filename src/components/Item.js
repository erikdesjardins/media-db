import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { formatDate, formatNumber } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id,
				url,
				title,
				creator,
				genres,
				characters,
				notes,
				date,
				length,
			}
		`,
	},
})
export default class Item extends React.Component {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	handleClick = () => {
		this.context.router.push(`/items/${this.props.item.id}`);
	};

	render() {
		const { item: { url, title, creator, genres, characters, notes, date, length } } = this.props;
		return (
			<tr onClick={this.handleClick}>
				<td><a href={url}>{title}</a></td>
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
