import ItemList from '../components/ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { AutoAffix } from 'react-overlays';
import { Col, Grid, Row } from 'react-bootstrap';

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
					<Col xs={8}>
						<ItemList viewer={this.props.viewer}/>
					</Col>
					<Col xs={4}>
						<AutoAffix viewportOffsetTop={15} container={this}>
							<div>
								{this.props.children}
							</div>
						</AutoAffix>
					</Col>
				</Row>
			</Grid>
		);
	}
}
