import AddProviderMutation from '../mutations/AddProviderMutation';
import CenteredColumn from './CenteredColumn';
import Provider from './Provider';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import Button from 'react-bootstrap/es/Button';

export default
@fragmentContainer(graphql`
	fragment ProviderList_viewer on User {
		providers(first: 2147483647) @connection(key: "Connection_providers") {
			edges {
				node {
					id
					...Provider_provider
				}
			}
		}
		...Provider_viewer
		...AddProviderMutation_viewer @relay(mask: false)
	}
`)
class ProviderList extends React.Component {
	handleAddProvider = () => {
		new AddProviderMutation({
			viewer: this.props.viewer,
		}).commit(this.props.relay.environment);
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
