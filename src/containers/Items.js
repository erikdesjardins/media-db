import ItemList from '../components/ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${ItemList.getFragment('viewer')}
			}
		`,
	},
})
export default class Items extends React.Component {
	render() {
		return (
			<div>
				<h1>{'Testing'}</h1>
				<ItemList viewer={this.props.viewer}/>
				{this.props.children}
			</div>
		);
	}
}
