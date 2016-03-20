import ItemList from './ItemList';
import React, { Component } from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	initialVariables: {
		limit: 10,
		first: 0,
	},
	fragments: {
		viewer: vars => Relay.QL`
			fragment on User {
				${ItemList.getFragment('viewer', { limit: vars.limit, first: vars.first })}
			}
		`,
	},
})
export default class App extends Component {
	render() {
		return (
			<ItemList
				limit={this.props.relay.variables.limit}
				first={this.props.relay.variables.first}
				viewer={this.props.viewer}
			/>
		);
	}
}
