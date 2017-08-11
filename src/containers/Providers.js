import ProviderList from '../components/ProviderList';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import Grid from 'react-bootstrap/es/Grid';

export default
@fragmentContainer(graphql`
	fragment Providers_viewer on User {
		...ProviderList_viewer
	}
`)
class Providers extends React.Component {
	render() {
		return (
			<Grid fluid>
				<ProviderList viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
