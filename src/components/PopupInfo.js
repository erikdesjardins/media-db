import AddActiveTabItemMutation from '../mutations/AddActiveTabItemMutation';
import ItemInfo from '../components/ItemInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import LinkButton from './LinkButton';

export default
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
class PopupInfo extends React.Component {
	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddActiveTabItemMutation({
			viewer: this.props.viewer,
		}));
	};

	render() {
		return (
			<div className="PopupInfo">
				{this.props.viewer.itemForActiveTab ?
					<ItemInfo
						item={this.props.viewer.itemForActiveTab}
						viewer={this.props.viewer}
					/> :
					<form>
						<LinkButton
							disabled={!this.props.viewer.providerMatchesActiveTab}
							onClick={this.handleAddItem}
						>
							{'Add'}
						</LinkButton>
					</form>
				}
			</div>
		);
	}
}
