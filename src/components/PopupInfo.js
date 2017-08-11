import AddActiveTabItemMutation from '../mutations/AddActiveTabItemMutation';
import ItemInfo from '../components/ItemInfo';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import Button from 'react-bootstrap/es/Button';
import FormGroup from 'react-bootstrap/es/FormGroup';
import Glyphicon from 'react-bootstrap/es/Glyphicon';

export default
@fragmentContainer(graphql`
	fragment PopupInfo_viewer on User {
		providerMatchesActiveTab
		itemForActiveTab {
			...ItemInfo_item
		}
		...ItemInfo_viewer
		...AddActiveTabItemMutation_viewer @relay(mask: false)
	}
`)
class PopupInfo extends React.Component {
	handleAddItem = () => {
		new AddActiveTabItemMutation({
			viewer: this.props.viewer,
		}).commit(this.props.relay.environment);
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
