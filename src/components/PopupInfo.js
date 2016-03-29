import ItemInfo from '../components/ItemInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				itemForActiveTab {
					${ItemInfo.getFragment('item')}
				},
				${ItemInfo.getFragment('viewer')}
			}
		`,
	},
})
export default class PopupInfo extends React.Component {
	render() {
		return (
			<div>
				{this.props.viewer.itemForActiveTab &&
					<ItemInfo
						item={this.props.viewer.itemForActiveTab}
						viewer={this.props.viewer}
					/>
				}
			</div>
		);
	}
}
