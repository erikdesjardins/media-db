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
	},
})
export default class Sidebar extends React.Component {
	render() {
		return (
			<div>
				<SidebarInfo item={this.props.item}/>
			</div>
		);
	}
}
