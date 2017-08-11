import Markdown from './Markdown';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemListTitle_item on Item {
		url
		title
		tags
	}
`)
class ItemListTitle extends React.Component {
	render() {
		return (
			<div className="CompactTable-item CompactTable-item--nowrap CompactTable-item--truncate">
				<Markdown
					source={`[${this.props.item.title}](${this.props.item.url} "${this.props.item.title}")${this.props.item.tags}`}
				/>
			</div>
		);
	}
}
