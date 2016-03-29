import React from 'react';
import Relay from 'react-relay';
import UpdateItemFieldsMutation from '../mutations/UpdateItemFieldsMutation';
import relay from 'relay-decorator';
import { Button, Glyphicon } from 'react-bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				fieldUpdates,
				${UpdateItemFieldsMutation.getFragment('item')}
			}
		`,
	},
})
export default class ItemFieldUpdates extends React.Component {
	isDisabled() {
		return !this.props.item.fieldUpdates.length;
	}

	handleClick = () => {
		if (this.isDisabled()) return;
		Relay.Store.commitUpdate(new UpdateItemFieldsMutation({
			item: this.props.item,
			fieldNames: this.props.item.fieldUpdates,
		}));
	};

	render() {
		return (
			<Button
				disabled={this.isDisabled()}
				onClick={this.handleClick}
			>
				<Glyphicon glyph="refresh"/>
			</Button>
		);
	}
}
