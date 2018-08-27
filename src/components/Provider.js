import AutosaveInput from './AutosaveInput';
import React from 'react';
import Relay from 'react-relay';
import RemoveProviderMutation from '../mutations/RemoveProviderMutation';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import relay from 'relay-decorator';
import Button from 'react-bootstrap/es/Button';
import Panel from 'react-bootstrap/es/Panel';

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

	styles = {
		panel: {
			fontFamily: 'monospace',
		},
		input: {
			fontFamily: 'monospace',
			resize: 'vertical',
			minHeight: '200px',
			margin: '-15px -15px -30px -15px',
			width: 'calc(100% + 30px)',
			boxShadow: 'none',
			border: 'none',
		},
		remove: {
			float: 'right',
			fontFamily: 'sans-serif',
		},
	};

	render() {
		return (
			<div>
				<Panel style={this.styles.panel}>
					<Panel.Heading>
						<Panel.Title>
							{'function fetchInfo(url) \u007B'}
							<Button
								style={this.styles.remove}
								bsStyle="danger"
								bsSize="xsmall"
								onClick={this.handleRemove}
							>
								{'Remove'}
							</Button>
						</Panel.Title>
					</Panel.Heading>
					<Panel.Body>
						<AutosaveInput
							style={this.styles.input}
							componentClass="textarea"
							hasFeedback
							defaultValue={this.props.provider.infoCallback}
							onSave={this.handleSave}
						/>
					</Panel.Body>
					<Panel.Footer>
						{'\u007D'}
					</Panel.Footer>
				</Panel>
			</div>
		);
	}
}
