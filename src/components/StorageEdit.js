import React from 'react';
import Relay from 'react-relay';
import SetRawItemsMutation from '../mutations/SetRawItemsMutation';
import numeral from 'numeral';
import relay from 'relay-decorator';
import { formatIsoDate } from '../utils/formatDate';
import LinkButton from './LinkButton';

export default
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
class StorageEdit extends React.Component {
	state = {
		value: this.props.viewer.rawItems,
		showTextarea: false,
	};

	componentWillReceiveProps(nextProps) {
		// if rawItems is updated by restoring a file, update the textarea
		if (!this.isDirty() && nextProps.viewer.rawItems !== this.props.viewer.rawItems) {
			this.setState({
				value: nextProps.viewer.rawItems,
			});
		}
	}

	isDirty() {
		return this.state.value !== this.props.viewer.rawItems;
	}

	isUpdating() {
		return this.props.relay.hasOptimisticUpdate(this.props.viewer);
	}

	handleToggleTextarea = () => {
		this.setState(({ showTextarea }) => ({
			showTextarea: !showTextarea,
		}));
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};

	handleSave = () => {
		Relay.Store.commitUpdate(new SetRawItemsMutation({
			rawItems: this.state.value,
			viewer: this.props.viewer,
		}));
	};

	handleUpload = () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.json';
		input.addEventListener('change', () => {
			const reader = new FileReader();
			reader.onload = () => {
				Relay.Store.commitUpdate(new SetRawItemsMutation({
					rawItems: reader.result,
					viewer: this.props.viewer,
				}));
			};
			reader.readAsText(input.files[0]);
		}, { once: true });
		input.click();
	};

	handleDownload = () => {
		const blob = new Blob([this.props.viewer.rawItems], { type: 'application/json' });
		const a = document.createElement('a');
		a.href = URL.createObjectURL(blob);
		const now = Date.now();
		a.download = `mediadb-backup-${formatIsoDate(now)}-${now}.json`;
		a.click();
	};

	render() {
		return (
			<fieldset className="StorageEdit">
				<legend>
					<LinkButton
						disabled={this.isUpdating()}
						onClick={this.handleUpload}
					>
						{'Upload'}
					</LinkButton>
					{' '}
					<LinkButton
						title={numeral(this.props.viewer.rawItems.length).format('0.0 b')}
						disabled={this.isUpdating()}
						onClick={this.handleDownload}
					>
						{'Download'}
					</LinkButton>
					{' '}
					<LinkButton
						onClick={this.handleToggleTextarea}
					>
						{this.state.showTextarea ? 'Hide Textarea' : 'Show Textarea'}
					</LinkButton>
					{' '}
					{this.state.showTextarea && this.isDirty() &&
						<LinkButton
							disabled={this.isUpdating()}
							onClick={this.handleSave}
						>
							{'Save'}
						</LinkButton>
					}
				</legend>
				{this.state.showTextarea &&
					<textarea
						className="StorageEdit-textarea"
						value={this.state.value}
						onChange={this.handleChange}
					/>
				}
			</fieldset>
		);
	}
}
