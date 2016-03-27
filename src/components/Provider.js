import _ from 'lodash';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import RemoveProviderMutation from '../mutations/RemoveProviderMutation';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import relay from 'relay-decorator';
import { Button, Input, Panel } from 'react-bootstrap';

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
export default class Provider extends ReactCSS.Component {
	state = {
		value: this.props.provider.infoCallback,
	};

	isDirty() {
		return this.state.value !== this.props.provider.infoCallback;
	}

	save = _.debounce(() => {
		Relay.Store.commitUpdate(new UpdateProviderMutation({
			provider: this.props.provider,
			infoCallback: this.state.value,
		}));
	}, 1000);

	handleChange = e => {
		this.setState({ value: e.target.value });
		this.save();
	};

	handleRemove = () => {
		Relay.Store.commitUpdate(new RemoveProviderMutation({
			provider: this.props.provider,
			viewer: this.props.viewer,
		}));
	};

	classes() {
		return {
			default: {
				panel: {
					fontFamily: 'monospace',
				},
				input: {
					fontFamily: 'monospace',
					resize: 'vertical',
					margin: '-15px -15px -30px -15px',
					width: 'calc(100% + 30px)',
					boxShadow: 'none',
					border: 'none',
				},
				remove: {
					float: 'right',
					marginTop: '-1px',
					marginBottom: '-1px',
					fontFamily: 'sans-serif',
				},
			},
		};
	}

	renderFooter() {
		// IntelliJ... -.-
		const closeBrace = '}';
		return (
			<div>
				{closeBrace}
				<Button
					is="remove"
					bsStyle="danger"
					bsSize="xsmall"
					onClick={this.handleRemove}
				>
					{'Remove'}
				</Button>
			</div>
		);
	}

	render() {
		return (
			<div>
				<Panel
					is="panel"
					header="function fetchInfo(url) {"
					footer={this.renderFooter()}
				>
					<Input
						is="input"
						type="textarea"
						bsSize="small"
						bsStyle={this.isDirty() ? 'warning' : null}
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</Panel>
			</div>
		);
	}
}
