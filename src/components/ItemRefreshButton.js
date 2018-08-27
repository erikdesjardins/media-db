import _ from 'lodash-es';
import React from 'react';
import PropTypes from 'prop-types';
import Relay from 'react-relay';
import UpdateItemFieldsMutation from '../mutations/UpdateItemFieldsMutation';
import relay from 'relay-decorator';
import Button from 'react-bootstrap/es/Button';
import Glyphicon from 'react-bootstrap/es/Glyphicon';
import OverlayTrigger from 'react-bootstrap/es/OverlayTrigger';
import Tooltip from 'react-bootstrap/es/Tooltip';

export default
@relay({
	fragments: {
		// unfortunately we need to fetch all of the fields of `fieldUpdates` to make this generic
		// but that's okay, because it's not any more expensive
		item: () => Relay.QL`
			fragment on Item {
				id
				fieldUpdates {
					thumbnail
					tinyThumbnail
					title
					creator
					genres
					characters
					length
					productionStatus
				}
				${UpdateItemFieldsMutation.getFragment('item')}
			}
		`,
	},
})
class ItemRefreshButton extends React.Component {
	static propTypes = {
		fields: PropTypes.arrayOf(PropTypes.oneOf([
			'thumbnail',
			'tinyThumbnail',
			'title',
			'creator',
			'genres',
			'characters',
			'length',
			'productionStatus',
		]).isRequired).isRequired,
	};

	isDisabled() {
		return this.props.fields.every(field => !this.props.item.fieldUpdates[field]);
	}

	handleClick = () => {
		Relay.Store.commitUpdate(new UpdateItemFieldsMutation({
			item: this.props.item,
			fieldUpdates: _.pick(this.props.item.fieldUpdates, this.props.fields),
		}));
	};

	styles = {
		refreshButton: {
			marginTop: '-2px',
			marginBottom: '-2px',
		},
	};

	render() {
		return (this.isDisabled() ?
			null :
			<OverlayTrigger
				placement="right"
				animation={false}
				rootClose
				overlay={
					<Tooltip id="field-updates">
						{Object.values(_.pickBy(_.pick(this.props.item.fieldUpdates, this.props.fields), x => x)).join(', ')}
					</Tooltip>
				}
			>
				<Button
					style={this.styles.refreshButton}
					bsSize="xsmall"
					disabled={this.isDisabled()}
					onClick={this.handleClick}
				>
					<Glyphicon glyph="refresh"/>
				</Button>
			</OverlayTrigger>
		);
	}
}
