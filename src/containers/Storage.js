import React from 'react';
import Relay from 'react-relay';
import CenteredColumn from '../components/CenteredColumn';
import StorageEdit from '../components/StorageEdit';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${StorageEdit.getFragment('viewer')}
			}
		`,
	},
})
class Storage extends React.Component {
	render() {
		return (
			<CenteredColumn>
				<StorageEdit viewer={this.props.viewer}/>
			</CenteredColumn>
		);
	}
}
