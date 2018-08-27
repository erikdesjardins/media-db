import ProviderList from '../components/ProviderList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import Grid from 'react-bootstrap/es/Grid';

export default
@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${ProviderList.getFragment('viewer')}
			}
		`,
	},
})
class Providers extends React.Component {
	render() {
		return (
			<Grid fluid>
				<ProviderList viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
