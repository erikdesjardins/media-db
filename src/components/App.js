import AddItemMutation from '../mutations/AddItemMutation';
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
				${AddItemMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class App extends React.Component {
	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddItemMutation({ viewer: this.props.viewer }));
	};

	render() {
		return (
			<div>
				<ItemList
					first={this.props.relay.variables.first}
					viewer={this.props.viewer}
				/>
				<button onClick={this.handleAddItem}>
					{'add item'}
				</button>
			</div>
		);
	}
}
