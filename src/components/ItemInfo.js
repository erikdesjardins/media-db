import ItemCharacters from './ItemCharacters';
import ItemFieldUpdates from './ItemFieldUpdates';
import ItemGenres from './ItemGenres';
import ItemLength from './ItemLength';
import ItemNotes from './ItemNotes';
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
				${ItemFieldUpdates.getFragment('item')}
				${ItemGenres.getFragment('item')}
				${ItemCharacters.getFragment('item')}
				${ItemLength.getFragment('item')}
				${ItemProductionStatus.getFragment('item')}
				${ItemStatus.getFragment('item')}
				${ItemNotes.getFragment('item')}
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${ItemStatus.getFragment('viewer')}
			}
		`,
	},
})
export default class ItemInfo extends React.Component {
	render() {
		const { item, viewer } = this.props;
		return (
			<div key={item.id}>
				<Thumbnail src={item.thumbnail}>
					<h3><a href={item.url}>{item.title}</a><small>{' by '}{item.creator}</small></h3>
					<ItemFieldUpdates item={item}/>
					<ItemGenres item={item}/>
					<ItemCharacters item={item}/>
					<ItemLength item={item}/>
					<ItemProductionStatus item={item}/>
					<ItemStatus item={item} viewer={viewer}/>
					<ItemNotes item={item}/>
				</Thumbnail>
			</div>
		);
	}
}
