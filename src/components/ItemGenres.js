import AutosaveInput from './AutosaveInput';
import EditItemGenresMutation from '../mutations/EditItemGenresMutation';
import ItemRefreshButton from './ItemRefreshButton';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				genres
				${ItemRefreshButton.getFragment('item')}
				${EditItemGenresMutation.getFragment('item')}
			}
		`,
	},
})
class ItemGenres extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new EditItemGenresMutation({
			item: this.props.item,
			genres: value,
		}));
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
