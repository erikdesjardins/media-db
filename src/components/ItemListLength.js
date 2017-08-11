import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import numeral from 'numeral';

export default
@fragmentContainer(graphql`
	fragment ItemListLength_item on Item {
		length
	}
`)
class ItemListLength extends React.Component {
	render() {
		return (
			<span className="CompactTable-item">
				{numeral(this.props.item.length).format('0a')}
			</span>
		);
	}
}
