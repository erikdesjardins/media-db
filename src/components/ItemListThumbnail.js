import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment ItemListThumbnail_item on Item {
		tinyThumbnail
	}
`)
class ItemListThumbnail extends React.Component {
	render() {
		return (
			<div className="CompactTable-item">
				{this.props.item.tinyThumbnail &&
					<img className="CompactTable-tinyThumbnail" src={this.props.item.tinyThumbnail}/>
				}
			</div>
		);
	}
}
