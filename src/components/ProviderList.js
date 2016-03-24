import AddProviderMutation from '../mutations/AddProviderMutation';
import Provider from './Provider';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Button, Col, Grid, Row } from 'react-bootstrap';

@relay({
	initialVariables: {
		first: 2147483647,
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				providers(first: $first) {
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
			<Grid fluid>
				<Row>
					<Col
						lg={6} lgOffset={3}
						md={8} mdOffset={2}
						xs={10} xsOffset={1}
					>
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
					</Col>
				</Row>
			</Grid>
		);
	}
}
