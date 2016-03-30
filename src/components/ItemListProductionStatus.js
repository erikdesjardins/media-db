import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import { Glyphicon } from 'react-bootstrap';

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

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				productionStatus,
			}
		`,
	},
})
export default class ItemListProductionStatus extends React.Component {
	render() {
		return (
			<Glyphicon {...props[this.props.item.productionStatus]}/>
		);
	}
}
