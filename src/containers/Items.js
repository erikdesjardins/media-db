import ItemView from '../components/ItemView';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Col, Grid, Row } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${ItemView.getFragment('viewer')}
			}
		`,
	},
})
export default class Items extends React.Component {
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col
						xs={12}
						sm={12}
						md={8}
						lg={9}
					>
						<ItemView viewer={this.props.viewer}/>
					</Col>
					<Col
						xs={12}
						sm={8} smOffset={2}
						md={4} mdOffset={0}
						lg={3}
					>
						{this.props.children}
					</Col>
				</Row>
			</Grid>
		);
	}
}
