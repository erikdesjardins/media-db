import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import Glyphicon from 'react-bootstrap/es/Glyphicon';

const props = {
	[productionStatusTypes.INCOMPLETE]: {
		glyph: 'pencil',
		style: { color: '#f7a616' },
	},
	[productionStatusTypes.COMPLETE]: {
		glyph: 'ok',
		style: { color: '#63bd40' },
	},
	[productionStatusTypes.HIATUS]: {
		glyph: 'pause',
		style: { color: '#bd7b40' },
	},
	[productionStatusTypes.CANCELLED]: {
		glyph: 'ban-circle',
		style: { color: '#bc3131' },
	},
};

export default
@fragmentContainer(graphql`
	fragment ItemListProductionStatus_item on Item {
		productionStatus
	}
`)
class ItemListProductionStatus extends React.Component {
	render() {
		return (
			<div className="CompactTable-item">
				<Glyphicon {...props[this.props.item.productionStatus]}/>
			</div>
		);
	}
}
