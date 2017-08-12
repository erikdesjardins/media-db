import AddActiveTabItemMutation from '../mutations/AddActiveTabItemMutation';
import ItemInfo from '../components/ItemInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import Button from 'react-bootstrap/es/Button';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Glyphicon from 'react-bootstrap/es/Glyphicon';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				providerMatchesActiveTab
				itemForActiveTab {
					${ItemInfo.getFragment('item')}
				}
				${ItemInfo.getFragment('viewer')}
				${AddActiveTabItemMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class PopupInfo extends React.Component {
	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddActiveTabItemMutation({
			viewer: this.props.viewer,
		}));
	};

	render() {
		return (this.props.viewer.itemForActiveTab ?
			<ItemInfo
				item={this.props.viewer.itemForActiveTab}
				viewer={this.props.viewer}
			/> :
			<FormGroup>
				<Button
					disabled={!this.props.viewer.providerMatchesActiveTab}
					onClick={this.handleAddItem}
				>
					<Glyphicon glyph="plus"/>
				</Button>
			</FormGroup>
		);
	}
}
