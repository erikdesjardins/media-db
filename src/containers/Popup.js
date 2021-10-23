import PopupInfo from '../components/PopupInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

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
			<PopupInfo viewer={this.props.viewer}/>
		);
	}
}
