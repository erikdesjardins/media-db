import Markdown from './Markdown';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemListNotes_item on Item {
		notes
	}
`)
class ItemListNotes extends React.Component {
	render() {
		return (
			<div className="CompactTable-item CompactTable-item--autowrap CompactTable-item--small">
				<Markdown source={this.props.item.notes}/>
			</div>
		);
	}
}
