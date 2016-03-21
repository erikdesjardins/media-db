import ItemList from './ItemList';
import React, { PropTypes } from 'react';
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
	static propTypes = {
		relay: PropTypes.shape({
			variables: PropTypes.shape({
				first: ItemList.propTypes.first,
			}).isRequired,
		}).isRequired,
		viewer: ItemList.propTypes.viewer,
	};

	render() {
		return (
			<ItemList
				first={this.props.relay.variables.first}
				viewer={this.props.viewer}
			/>
		);
	}
}
