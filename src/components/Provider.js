import React from 'react';
import Relay from 'react-relay';
import UpdateProviderMutation from '../mutations/UpdateProviderMutation';
import relay from 'relay-decorator';
import { Input, Panel } from 'react-bootstrap';

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
export default class Provider extends React.Component {
	handleChange = e => {
		Relay.Store.commitUpdate(new UpdateProviderMutation({
			provider: this.props.provider,
			infoCallback: e.target.value,
		}));
	};

	render() {
		return (
			<div>
				<Panel
					header="function fetchInfo(url) {"
					footer="}"
				>
					<Input
						type="textarea"
						defaultValue={this.props.provider.infoCallback}
						onChange={this.handleChange}
					/>
				</Panel>
			</div>
		);
	}
}
