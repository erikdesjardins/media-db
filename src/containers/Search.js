import React from 'react';
import Relay from 'react-relay';
import SearchList from '../components/SearchList';
import relay from 'relay-decorator';
import { Col, Grid, Row } from 'react-bootstrap';

@relay({
	fragments: {
		items: () => Relay.QL`
			fragment on ItemConnection {
				${SearchList.getFragment('items')}
			}
		`,
	},
})
export default class Search extends React.Component {
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col xs={12}>
						<SearchList items={this.props.items}/>
					</Col>
				</Row>
			</Grid>
		);
	}
}
