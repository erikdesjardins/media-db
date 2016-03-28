import ItemCharacters from './ItemCharacters';
import ItemGenres from './ItemGenres';
import ItemLength from './ItemLength';
import ItemProductionStatus from './ItemProductionStatus';
import ItemStatus from './ItemStatus';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Thumbnail } from 'react-bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id,
				url,
				thumbnail,
				title,
				creator,
				notes,
				${ItemGenres.getFragment('item')}
				${ItemCharacters.getFragment('item')}
				${ItemLength.getFragment('item')}
				${ItemProductionStatus.getFragment('item')}
				${ItemStatus.getFragment('item')}
			}
		`,
	},
})
export default class ItemInfo extends React.Component {
	render() {
		const { item: { url, thumbnail, title, creator, notes } } = this.props;
		return (
			<div key={this.props.item.id}>
				<Thumbnail src={thumbnail}>
					<h3><a href={url}>{title}</a><small>{' by '}{creator}</small></h3>
					<ItemGenres item={this.props.item}/>
					<ItemCharacters item={this.props.item}/>
					<p>{'Notes: '}{notes}</p>
					<ItemLength item={this.props.item}/>
					<ItemProductionStatus item={this.props.item}/>
					<ItemStatus item={this.props.item}/>
				</Thumbnail>
			</div>
		);
	}
}
