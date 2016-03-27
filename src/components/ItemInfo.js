import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Thumbnail } from 'react-bootstrap';
import { formatDate } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id,
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
				statusDate,
			}
		`,
	},
})
export default class ItemInfo extends React.Component {
	render() {
		const { item: { url, thumbnail, title, creator, genres, characters, notes, length, status, productionStatus, statusDate } } = this.props;
		return (
			<div key={this.props.item.id}>
				<Thumbnail src={thumbnail}>
					<h3><a href={url}>{title}</a><small>{' by '}{creator}</small></h3>
					<p>{'Genres: '}{genres.join(', ')}</p>
					<p>{'Characters: '}{characters.join(', ')}</p>
					<p>{'Notes: '}{notes}</p>
					<p>{'Length: '}{length}</p>
					<p>{'Status: '}{status}</p>
					<p>{'Production status: '}{productionStatus}</p>
					<p>{'Status updated: '}{formatDate(statusDate)}</p>
				</Thumbnail>
			</div>
		);
	}
}
