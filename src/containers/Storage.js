import React from 'react';
import Relay from 'react-relay';
import StorageEdit from '../components/StorageEdit';
import relay from 'relay-decorator';
import Grid from 'react-bootstrap/es/Grid';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${StorageEdit.getFragment('viewer')}
			}
		`,
	},
})
export default class Storage extends React.Component {
	render() {
		return (
			<Grid fluid>
				<StorageEdit viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
