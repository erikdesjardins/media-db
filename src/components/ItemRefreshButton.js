import _ from 'lodash';
import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import UpdateItemFieldsMutation from '../mutations/UpdateItemFieldsMutation';
import relay from 'relay-decorator';
import { Button, Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

@relay({
	fragments: {
		// unfortunately we need to fetch all of the fields of `fieldUpdates` to make this generic
		// but that's okay, because it's not any more expensive
		item: () => Relay.QL`
			fragment on Item {
				id,
				fieldUpdates {
					thumbnail,
					title,
					creator,
					genres,
					characters,
					length,
					productionStatus,
				},
				${UpdateItemFieldsMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemRefreshButton extends React.Component {
	static propTypes = {
		fields: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
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

	render() {
		const styles = {
			refreshButton: {
				marginTop: '-2px',
				marginBottom: '-2px',
			},
		};

		return (this.isDisabled() ? null :
			<OverlayTrigger
				placement="right"
				animation={false}
				rootClose
				overlay={
					<Tooltip id="field-updates">
						{_.values(_.pickBy(_.pick(this.props.item.fieldUpdates, this.props.fields))).join(', ')}
					</Tooltip>
				}
			>
				<Button
					style={styles.refreshButton}
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
