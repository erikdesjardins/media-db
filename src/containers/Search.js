import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import SearchList from '../components/SearchList';
import Col from 'react-bootstrap/es/Col';
import Grid from 'react-bootstrap/es/Grid';
import Row from 'react-bootstrap/es/Row';

export default
@fragmentContainer(graphql`
	fragment Search_viewer on User {
		previewItems: searchItems(query: $query, first: 25) @include(if: $preview) {
			...SearchList_items
		}
		searchItems(query: $query, first: 2147483647) @skip(if: $preview) {
			...SearchList_items
		}
	}
`)
class Search extends React.Component {
	render() {
		return (
			<Grid fluid>
				<Row>
					<Col xs={12}>
						<SearchList items={this.props.viewer.previewItems || this.props.viewer.searchItems}/>
					</Col>
				</Row>
			</Grid>
		);
	}
}
