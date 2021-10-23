import AutosaveInput from './AutosaveInput';
import React from 'react';
import Relay from 'react-relay';
import RemoveProviderMutation from '../mutations/RemoveProviderMutation';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import relay from 'relay-decorator';
import LinkButton from './LinkButton';

export default
@relay({
	fragments: {
		provider: () => Relay.QL`
			fragment on Provider {
				infoCallback
				${UpdateProviderMutation.getFragment('provider')}
				${RemoveProviderMutation.getFragment('provider')}
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${RemoveProviderMutation.getFragment('viewer')}
			}
		`,
	},
})
class Provider extends React.Component {
	handleSave = value => {
		Relay.Store.commitUpdate(new UpdateProviderMutation({
			provider: this.props.provider,
			infoCallback: value,
		}));
	};

	handleRemove = () => {
		Relay.Store.commitUpdate(new RemoveProviderMutation({
			provider: this.props.provider,
			viewer: this.props.viewer,
		}));
	};

	render() {
		return (
			<div className="Provider">
				<LinkButton
					className="Provider-removeButton"
					onClick={this.handleRemove}
				>
					{'Remove'}
				</LinkButton>
				<AutosaveInput
					className="Provider-textarea"
					type="textarea"
					defaultValue={this.props.provider.infoCallback}
					onSave={this.handleSave}
				/>
			</div>
		);
	}
}
