import Markdown from './Markdown';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemListGenres_item on Item {
		genres
	}
`)
class ItemListGenres extends React.Component {
	render() {
		return (
			<div className="CompactTable-item CompactTable-item--small CompactTable-item--nowrap">
				<Markdown source={this.props.item.genres}/>
			</div>
		);
	}
}
