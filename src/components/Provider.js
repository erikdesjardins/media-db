import AutosaveInput from './AutosaveInput';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import RemoveProviderMutation from '../mutations/RemoveProviderMutation';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import Button from 'react-bootstrap/es/Button';
import Panel from 'react-bootstrap/es/Panel';

export default
@fragmentContainer(graphql`
	fragment Provider_provider on Provider {
		infoCallback
		...UpdateProviderMutation_provider @relay(mask: false)
		...RemoveProviderMutation_provider @relay(mask: false)
	}
	fragment Provider_viewer on User {
		...RemoveProviderMutation_viewer @relay(mask: false)
	}
`)
class Provider extends React.Component {
	handleSave = value => {
		new UpdateProviderMutation({
			provider: this.props.provider,
			infoCallback: value,
		}).commit(this.props.relay.environment);
	};

	handleRemove = () => {
		new RemoveProviderMutation({
			provider: this.props.provider,
			viewer: this.props.viewer,
		}).commit(this.props.relay.environment);
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
