import AutosaveInput from './AutosaveInput';
import EditItemGenresMutation from '../mutations/EditItemGenresMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				genres,
				${EditItemGenresMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemGenres extends React.Component {
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
				label="Genres"
				defaultValue={this.props.item.genres}
				onSave={this.handleSave}
			/>
		);
	}
}
