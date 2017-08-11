import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import Thumbnail from 'react-bootstrap/es/Thumbnail';

export default
@fragmentContainer(graphql`
	fragment ItemThumbnail_item on Item {
		thumbnail
		...ItemRefreshButton_item
	}
`)
class ItemThumbnail extends React.Component {
	render() {
		return (
			<div>
				{this.props.item.thumbnail &&
					<Thumbnail src={this.props.item.thumbnail}/>
				}
				<ItemRefreshButton
					item={this.props.item}
					fields={['thumbnail', 'tinyThumbnail']}
				/>
			</div>
		);
	}
}
