import React, { PropTypes } from 'react';
import Relay from 'react-relay';
import UpdateItemFieldsMutation from '../mutations/UpdateItemFieldsMutation';
import relay from 'relay-decorator';
import { Button, Glyphicon } from 'react-bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				id,
				fieldUpdates,
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
		return !this.props.fields.every(field => this.props.item.fieldUpdates.includes(field));
	}

	handleClick = () => {
		if (this.isDisabled()) return;
		Relay.Store.commitUpdate(new UpdateItemFieldsMutation({
			item: this.props.item,
			fieldNames: this.props.fields,
		}));
	};

	render() {
		return (
			<Button
				bsSize="xsmall"
				disabled={this.isDisabled()}
				onClick={this.handleClick}
			>
				<Glyphicon glyph="refresh"/>
			</Button>
		);
	}
}
