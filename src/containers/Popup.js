import PopupHeader from '../components/PopupHeader';
import PopupInfo from '../components/PopupInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${PopupHeader.getFragment('viewer')}
				${PopupInfo.getFragment('viewer')}
			}
		`,
	},
})
export default class Popup extends React.Component {
	render() {
		return (
			<div>
				<PopupHeader viewer={this.props.viewer}/>
				<PopupInfo viewer={this.props.viewer}/>
			</div>
		);
	}
}
