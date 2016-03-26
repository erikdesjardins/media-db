import ItemList from '../components/ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Col, Grid, Row, PageHeader } from 'react-bootstrap';

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
			<Grid fluid>
				<Row>
					<PageHeader>{'Items'}</PageHeader>
				</Row>
				<Row>
					<Col xs={8}>
						<ItemList viewer={this.props.viewer}/>
					</Col>
					<Col xs={4}>
						{this.props.children}
					</Col>
				</Row>
			</Grid>
		);
	}
}
