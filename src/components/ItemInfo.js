import ItemCharacters from './ItemCharacters';
import ItemGenres from './ItemGenres';
import ItemLength from './ItemLength';
import ItemNotes from './ItemNotes';
import ItemProductionStatus from './ItemProductionStatus';
import ItemStatus from './ItemStatus';
import ItemTags from './ItemTags';
import ItemThumbnail from './ItemThumbnail';
import ItemTitleBlock from './ItemTitleBlock';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemInfo_item on Item {
		id
		...ItemThumbnail_item
		...ItemTitleBlock_item
		...ItemStatus_item
		...ItemProductionStatus_item
		...ItemGenres_item
		...ItemCharacters_item
		...ItemLength_item
		...ItemNotes_item
		...ItemTags_item
	}
	fragment ItemInfo_viewer on User {
		...ItemStatus_viewer
	}
`)
class ItemInfo extends React.Component {
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
				<ItemTags item={item}/>
			</div>
		);
	}
}
