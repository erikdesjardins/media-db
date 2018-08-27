import PopupInfo from '../components/PopupInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import Grid from 'react-bootstrap/es/Grid';

export default
@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${PopupInfo.getFragment('viewer')}
			}
		`,
	},
})
class Popup extends React.Component {
	render() {
		return (
			<Grid fluid>
				<PopupInfo viewer={this.props.viewer}/>
			</Grid>
		);
	}
}
