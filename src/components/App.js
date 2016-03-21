import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	initialVariables: {
		first: 10,
	},
	fragments: {
		viewer: vars => Relay.QL`
			fragment on User {
				${ItemList.getFragment('viewer', { first: vars.first })}
			}
		`,
	},
})
export default class App extends React.Component {
	render() {
		return (
			<ItemList
				first={this.props.relay.variables.first}
				viewer={this.props.viewer}
			/>
		);
	}
}
