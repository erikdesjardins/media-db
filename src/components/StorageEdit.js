import CenteredColumn from './CenteredColumn';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import SetRawItemsMutation from '../mutations/SetRawItemsMutation';
import moment from 'moment';
import relay from 'relay-decorator';
import { Button, ButtonToolbar, Input } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				rawItems,
				${SetRawItemsMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class StorageEdit extends ReactCSS.Component {
	state = {
		value: this.props.viewer.rawItems,
	};

	isDirty() {
		return this.state.value !== this.props.viewer.rawItems;
	}

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	handleSave = () => {
		if (!this.isDirty()) return;
		Relay.Store.commitUpdate(new SetRawItemsMutation({
			rawItems: this.state.value,
			viewer: this.props.viewer,
		}));
	};

	handleDownload = () => {
		const blob = new Blob([this.props.viewer.rawItems], { type: 'application/json' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		a.download = `mediadb-backup-${moment().format('YYYY-MM-DD-X')}.json`;
		a.click();
	};

	classes() {
		return {
			default: {
				textarea: {
					resize: 'vertical',
					height: '500px',
				},
			},
		};
	}

	render() {
		return (
			<CenteredColumn>
				<Input
					is="textarea"
					type="textarea"
					value={this.state.value}
					onChange={this.handleChange}
				/>
				<ButtonToolbar>
					<Button bsStyle="primary" disabled={!this.isDirty()} onClick={this.handleSave}>{'Save'}</Button>
					<Button onClick={this.handleDownload}>{'Download'}</Button>
				</ButtonToolbar>
			</CenteredColumn>
		);
	}
}
