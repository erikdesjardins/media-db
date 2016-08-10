import AddProviderMutation from '../mutations/AddProviderMutation';
import CenteredColumn from './CenteredColumn';
import Provider from './Provider';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Button } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				providers(first: 2147483647) {
					edges {
						node {
							id
							${Provider.getFragment('provider')}
						}
					}
				}
				${Provider.getFragment('viewer')}
				${AddProviderMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class ProviderList extends React.Component {
	handleAddProvider = () => {
		Relay.Store.commitUpdate(new AddProviderMutation({ viewer: this.props.viewer }));
	};

	render() {
		return (
			<CenteredColumn>
				{this.props.viewer.providers.edges.map(edge =>
					<Provider
						key={edge.node.id}
						provider={edge.node}
						viewer={this.props.viewer}
					/>
				)}
				<Button bsStyle="primary" onClick={this.handleAddProvider}>
					{'Add Provider'}
				</Button>
			</CenteredColumn>
		);
	}
}
