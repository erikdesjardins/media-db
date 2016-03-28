import ItemCharacters from './ItemCharacters';
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
				${ItemGenres.getFragment('item')}
				${ItemCharacters.getFragment('item')}
				${ItemLength.getFragment('item')}
				${ItemProductionStatus.getFragment('item')}
				${ItemStatus.getFragment('item')}
				${ItemNotes.getFragment('item')}
			}
		`,
	},
})
export default class ItemInfo extends React.Component {
	render() {
		const { item: { url, thumbnail, title, creator } } = this.props;
		return (
			<div key={this.props.item.id}>
				<Thumbnail src={thumbnail}>
					<h3><a href={url}>{title}</a><small>{' by '}{creator}</small></h3>
					<ItemGenres item={this.props.item}/>
					<ItemCharacters item={this.props.item}/>
					<ItemLength item={this.props.item}/>
					<ItemProductionStatus item={this.props.item}/>
					<ItemStatus item={this.props.item}/>
					<ItemNotes item={this.props.item}/>
				</Thumbnail>
			</div>
		);
	}
}
