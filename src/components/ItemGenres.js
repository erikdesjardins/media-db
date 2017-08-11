import AutosaveInput from './AutosaveInput';
import EditItemGenresMutation from '../mutations/EditItemGenresMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemGenres_item on Item {
		genres
		...ItemRefreshButton_item
		...EditItemGenresMutation_item @relay(mask: false)
	}
`)
class ItemGenres extends React.Component {
	handleSave = value => {
		new EditItemGenresMutation({
			item: this.props.item,
			genres: value,
		}).commit(this.props.relay.environment);
	};

	render() {
		return (
			<AutosaveInput
				type="text"
				label={
					<div>
						{'Genres'}
						{' '}
						<ItemRefreshButton
							item={this.props.item}
							fields={['genres']}
						/>
					</div>
				}
				defaultValue={this.props.item.genres}
				onSave={this.handleSave}
			/>
		);
	}
}
