import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemTitleBlock_item on Item {
		url
		title
		creator
		...ItemRefreshButton_item
	}
`)
class ItemTitleBlock extends React.Component {
	render() {
		const { item } = this.props;
		return (
			<h3>
				<a href={item.url}>{item.title}</a>
				<small>
					{' by '}{item.creator}
					{' '}
					<ItemRefreshButton
						item={item}
						fields={['title', 'creator']}
					/>
				</small>
			</h3>
		);
	}
}
