import ProviderList from '../components/ProviderList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Grid, PageHeader } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${ProviderList.getFragment('viewer')}
			}
		`,
	},
})
export default class Providers extends React.Component {
	render() {
		return (
			<Grid fluid>
				<PageHeader>{'Providers'}</PageHeader>
				<ProviderList viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
