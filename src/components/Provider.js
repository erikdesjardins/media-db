import _ from 'lodash';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import relay from 'relay-decorator';
import { Button, Input, Panel } from 'react-bootstrap';

@relay({
	fragments: {
		provider: () => Relay.QL`
			fragment on Provider {
				infoCallback,
				${UpdateProviderMutation.getFragment('provider')}
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

	classes() {
		return {
			default: {
				panel: {
					fontFamily: 'monospace',
				},
				input: {
					fontFamily: 'monospace',
					resize: 'vertical',
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
				<Button is="remove" bsStyle="danger" bsSize="xsmall">
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
						bsStyle={this.isDirty() ? 'warning' : null}
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</Panel>
			</div>
		);
	}
}
