import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import { formatFullDate } from '../utils/formatDate';

export default
@fragmentContainer(graphql`
	fragment ItemListStatusDate_item on Item {
		statusDate
	}
`)
class ItemListStatusDate extends React.Component {
	render() {
		return (
			<span className="CompactTable-item CompactTable-item--nowrap CompactTable-item--small">
				{formatFullDate(this.props.item.statusDate)}
			</span>
		);
	}
}
