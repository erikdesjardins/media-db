import CenteredColumn from './CenteredColumn';
import React from 'react';
import Relay from 'react-relay';
import SetRawItemsMutation from '../mutations/SetRawItemsMutation';
import moment from 'moment';
import relay from 'relay-decorator';
import { Button, ButtonToolbar, FormControl, FormGroup } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				rawItems
				${SetRawItemsMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class StorageEdit extends React.Component {
	state = {
		value: this.props.viewer.rawItems,
	};

	isDirty() {
		return this.state.value !== this.props.viewer.rawItems;
	}

	isUpdating() {
		return this.props.relay.hasOptimisticUpdate(this.props.viewer);
	}

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	handleSave = () => {
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

	render() {
		const styles = {
			textarea: {
				resize: 'vertical',
				height: '500px',
			},
		};

		return (
			<CenteredColumn>
				<FormGroup>
					<FormControl
						style={styles.textarea}
						componentClass="textarea"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				</FormGroup>
				<ButtonToolbar>
					<Button
						bsStyle={this.isUpdating() ? 'warning' : 'primary'}
						disabled={this.isUpdating() || !this.isDirty()}
						onClick={this.handleSave}
					>
						{'Save'}
					</Button>
					<Button onClick={this.handleDownload}>{'Download'}</Button>
				</ButtonToolbar>
			</CenteredColumn>
		);
	}
}
