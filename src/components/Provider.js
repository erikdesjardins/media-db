import AutosaveInput from './AutosaveInput';
import React from 'react';
import Relay from 'react-relay';
import RemoveProviderMutation from '../mutations/RemoveProviderMutation';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import relay from 'relay-decorator';
import { Button, Panel } from 'react-bootstrap';

@relay({
	fragments: {
		provider: () => Relay.QL`
			fragment on Provider {
				infoCallback,
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
export default class Provider extends React.Component {
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
		const styles = {
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

		// IntelliJ can't deal with braces in strings in JSX... -.-
		const prefix = 'function fetchInfo(url) {';
		const suffix = '}';
		return (
			<div>
				<Panel
					style={styles.panel}
					header={
						<div>
							{prefix}
							<Button
								style={styles.remove}
								bsStyle="danger"
								bsSize="xsmall"
								onClick={this.handleRemove}
							>
								{'Remove'}
							</Button>
						</div>
					}
					footer={suffix}
				>
					<AutosaveInput
						style={styles.input}
						type="textarea"
						hasFeedback
						defaultValue={this.props.provider.infoCallback}
						onSave={this.handleSave}
					/>
				</Panel>
			</div>
		);
	}
}
