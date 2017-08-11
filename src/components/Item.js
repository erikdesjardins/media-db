import ItemListCharacters from './ItemListCharacters';
import ItemListCreator from './ItemListCreator';
import ItemListGenres from './ItemListGenres';
import ItemListLength from './ItemListLength';
import ItemListNotes from './ItemListNotes';
import ItemListProductionStatus from './ItemListProductionStatus';
import ItemListStatusDate from './ItemListStatusDate';
import ItemListThumbnail from './ItemListThumbnail';
import ItemListTitle from './ItemListTitle';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment Item_item on Item {
		id
		...ItemListThumbnail_item
		...ItemListTitle_item
		...ItemListCreator_item
		...ItemListGenres_item
		...ItemListCharacters_item
		...ItemListNotes_item
		...ItemListStatusDate_item
		...ItemListLength_item
		...ItemListProductionStatus_item
	}
`)
class Item extends React.Component {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	handleClick = () => {
		this.context.router.push(`/items/${encodeURIComponent(this.props.item.id)}/info`);
	};

	render() {
		const { item } = this.props;
		return (
			<tr onClick={this.handleClick}>
				<td><ItemListThumbnail item={item}/></td>
				<td><ItemListTitle item={item}/></td>
				<td><ItemListCreator item={item}/></td>
				<td><ItemListGenres item={item}/></td>
				<td><ItemListCharacters item={item}/></td>
				<td><ItemListNotes item={item}/></td>
				<td><ItemListStatusDate item={item}/></td>
				<td><ItemListLength item={item}/></td>
				<td><ItemListProductionStatus item={item}/></td>
			</tr>
		);
	}
}
