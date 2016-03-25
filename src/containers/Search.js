import React from 'react';
import { Grid, PageHeader } from 'react-bootstrap';

export default class Search extends React.Component {
	render() {
		return (
			<Grid fluid>
				<PageHeader>
					{'Search'}
					<small>{this.props.params.query}</small>
				</PageHeader>
			</Grid>
		);
	}
}
