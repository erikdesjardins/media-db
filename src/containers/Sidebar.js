import React from 'react';
import Relay from 'react-relay';
import SidebarInfo from '../components/SidebarInfo';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				${SidebarInfo.getFragment('item')}
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${SidebarInfo.getFragment('viewer')}
			}
		`,
	},
})
export default class Sidebar extends React.Component {
	render() {
		return (
			<div>
				<SidebarInfo item={this.props.item} viewer={this.props.viewer}/>
			</div>
		);
	}
}
