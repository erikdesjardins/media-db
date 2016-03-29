import ItemHistory from '../components/ItemHistory';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				${ItemHistory.getFragment('item')}
			}
		`,
	},
})
export default class SidebarHistory extends React.Component {
	render() {
		return (
			<ItemHistory item={this.props.item}/>
		);
	}
}
