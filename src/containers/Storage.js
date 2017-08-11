import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import StorageEdit from '../components/StorageEdit';
import Grid from 'react-bootstrap/es/Grid';

export default
@fragmentContainer(graphql`
	fragment Storage_viewer on User {
		...StorageEdit_viewer
	}
`)
class Storage extends React.Component {
	render() {
		return (
			<Grid fluid>
				<StorageEdit viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
