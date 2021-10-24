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

export default class Item extends React.Component {
	constructor(...args) {
		super(...args);

		this.handleClick = () => {
			this.context.router.push(`/items/${btoa(this.props.item.id)}/info`);
		};
	}

	render() {
		const { item } = this.props;
		return (
			<tr className="Item" onClick={this.handleClick}>
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

Item.contextTypes = {
	router: () => {},
};
