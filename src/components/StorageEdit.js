import CenteredColumn from './CenteredColumn';
import React from 'react';
import Relay from 'react-relay';
import SetRawItemsMutation from '../mutations/SetRawItemsMutation';
import numeral from 'numeral';
import relay from 'relay-decorator';
import Button from 'react-bootstrap/es/Button';
import ButtonToolbar from 'react-bootstrap/es/ButtonToolbar';
import FormControl from 'react-bootstrap/es/FormControl';
import FormGroup from 'react-bootstrap/es/FormGroup';
import OverlayTrigger from 'react-bootstrap/es/OverlayTrigger';
import Tooltip from 'react-bootstrap/es/Tooltip';
import { formatIsoDate } from '../utils/formatDate';

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
		const styles = {
			textarea: {
				resize: 'vertical',
				height: '500px',
			},
			toggleTextareaButton: {
				float: 'right',
			},
		};

		return (
			<CenteredColumn>
				<FormGroup>
					<ButtonToolbar>
						<Button
							bsStyle={this.isUpdating() ? 'warning' : 'primary'}
							disabled={this.isUpdating()}
							onClick={this.handleUpload}
						>
							{'Upload'}
						</Button>
						<OverlayTrigger
							placement="right"
							animation={false}
							rootClose
							overlay={
								<Tooltip id="download-size">
									{numeral(this.props.viewer.rawItems.length).format('0.0 b')}
								</Tooltip>
							}
						>
							<Button
								disabled={this.isUpdating()}
								onClick={this.handleDownload}
							>
								{'Download'}
							</Button>
						</OverlayTrigger>
						<Button
							style={styles.toggleTextareaButton}
							onClick={this.handleToggleTextarea}
						>
							{this.state.showTextarea ? 'Hide Textarea' : 'Show Textarea'}
						</Button>
					</ButtonToolbar>
				</FormGroup>
				{this.state.showTextarea &&
					<div>
						<FormGroup>
							<FormControl
								style={styles.textarea}
								componentClass="textarea"
								value={this.state.value}
								onChange={this.handleChange}
							/>
						</FormGroup>
						<Button
							bsStyle={this.isUpdating() ? 'warning' : 'primary'}
							disabled={this.isUpdating() || !this.isDirty()}
							onClick={this.handleSave}
						>
							{'Save'}
						</Button>
					</div>
				}
			</CenteredColumn>
		);
	}
}
