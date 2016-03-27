import React, { PropTypes } from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import * as productionStatusTypes from '../constants/productionStatusTypes';
import { Glyphicon } from 'react-bootstrap';
import { formatDate, formatNumber } from '../utils/format';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id,
				url,
				thumbnail,
				title,
				creator,
				genres,
				characters,
				notes,
				productionStatus,
				statusDate,
				length,
			}
		`,
	},
})
export default class Item extends ReactCSS.Component {
	static contextTypes = {
		router: PropTypes.object.isRequired,
	};

	handleClick = () => {
		this.context.router.push(`/items/${this.props.item.id}`);
	};

	classes() {
		return {
			default: {
				thumbnail: {
					maxHeight: '20px',
					marginTop: '-2px',
					marginBottom: 0,
				},
			},
		};
	}

	renderProductionStatusIcon() {
		const { item: { productionStatus } } = this.props;
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
		return <Glyphicon {...props[productionStatus]}/>;
	}

	render() {
		const { item: { url, thumbnail, title, creator, genres, characters, notes, statusDate, length } } = this.props;
		return (
			<tr onClick={this.handleClick}>
				<td><img is="thumbnail" src={thumbnail}/></td>
				<td><a href={url}>{title}</a></td>
				<td>{creator}</td>
				<td>{genres.join(', ')}</td>
				<td>{characters.join(', ')}</td>
				<td>{notes}</td>
				<td>{formatDate(statusDate)}</td>
				<td>{formatNumber(length)}</td>
				<td>{this.renderProductionStatusIcon()}</td>
			</tr>
		);
	}
}
