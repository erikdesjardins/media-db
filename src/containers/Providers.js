import CenteredColumn from '../components/CenteredColumn';
import ProviderList from '../components/ProviderList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

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
			<CenteredColumn className="Providers">
				<ProviderList viewer={this.props.viewer}/>
			</CenteredColumn>
		);
	}
}
