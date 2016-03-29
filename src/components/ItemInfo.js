import ItemCharacters from './ItemCharacters';
import ItemGenres from './ItemGenres';
import ItemLength from './ItemLength';
import ItemNotes from './ItemNotes';
import ItemProductionStatus from './ItemProductionStatus';
import ItemStatus from './ItemStatus';
import ItemThumbnail from './ItemThumbnail';
import ItemTitleBlock from './ItemTitleBlock';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id,
				${ItemThumbnail.getFragment('item')}
				${ItemTitleBlock.getFragment('item')}
				${ItemStatus.getFragment('item')}
				${ItemProductionStatus.getFragment('item')}
				${ItemGenres.getFragment('item')}
				${ItemCharacters.getFragment('item')}
				${ItemLength.getFragment('item')}
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
				<ItemThumbnail item={item}/>
				<ItemTitleBlock item={item}/>
				<ItemStatus item={item} viewer={viewer}/>
				<ItemProductionStatus item={item}/>
				<ItemGenres item={item}/>
				<ItemCharacters item={item}/>
				<ItemLength item={item}/>
				<ItemNotes item={item}/>
			</div>
		);
	}
}
