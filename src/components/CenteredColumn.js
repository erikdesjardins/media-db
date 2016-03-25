import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

export default class CenteredColumn extends React.Component {
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col
						lg={6} lgOffset={3}
						md={8} mdOffset={2}
						xs={10} xsOffset={1}
					>
						{this.props.children}
					</Col>
				</Row>
			</Grid>
		);
	}
}
