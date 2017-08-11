import Markdown from './Markdown';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemListCreator_item on Item {
		creator
	}
`)
class ItemListCreator extends React.Component {
	render() {
		return (
			<div className="CompactTable-item CompactTable-item--nowrap">
				<Markdown source={this.props.item.creator}/>
			</div>
		);
	}
}
