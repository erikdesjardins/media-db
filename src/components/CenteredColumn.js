import React from 'react';
import Col from 'react-bootstrap/es/Col';
import Grid from 'react-bootstrap/es/Grid';
import Row from 'react-bootstrap/es/Row';

export default class CenteredColumn extends React.PureComponent {
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col
						xs={12} xsOffset={0}
						sm={10} smOffset={1}
						md={8} mdOffset={2}
						lg={6} lgOffset={3}
					>
						{this.props.children}
					</Col>
				</Row>
			</Grid>
		);
	}
}
