import ItemInfo from '../components/ItemInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				${ItemInfo.getFragment('item')}
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${ItemInfo.getFragment('viewer')}
			}
		`,
	},
})
export default class SidebarInfo extends React.Component {
	render() {
		return (
			<ItemInfo
				item={this.props.item}
				viewer={this.props.viewer}
			/>
		);
	}
}
