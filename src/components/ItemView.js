import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import { Button, ButtonGroup, Glyphicon, Panel } from 'react-bootstrap';
import { fillPanelBody, panelHeaderButtonCenter } from '../styles/bootstrap';

const LIMIT = 25;

@relay({
	initialVariables: {
		status: statusTypes.IN_PROGRESS,
	},
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				items(status: $status, first: 2147483647) {
					edges
					${ItemList.getFragment('items')}
				}
			}
		`,
	},
})
export default class ItemView extends React.Component {
	state = {
		offset: 0,
	};

	handleStatusChange = status => {
		this.props.relay.setVariables({
			status,
		});
		this.setState({
			offset: 0,
		});
	};

	hasPrev() {
		return !!this.state.offset;
	}

	hasNext() {
		return this.state.offset + LIMIT < this.props.viewer.items.edges.length;
	}

	handlePrev = () => {
		if (this.props.relay.pendingVariables) return;
		this.setState({
			offset: this.state.offset - LIMIT,
		});
	};

	handleNext = () => {
		if (this.props.relay.pendingVariables) return;
		this.setState({
			offset: this.state.offset + LIMIT,
		});
	};

	render() {
		const styles = {
			statusSelect: {
				...panelHeaderButtonCenter,
			},
			panel: {
				overflow: 'hidden',
			},
			itemList: {
				...fillPanelBody,
			},
			pageButtons: {
				float: 'right',
			},
		};

		return (
			<Panel
				style={styles.panel}
				header={
					<div>
						<SelectBar
							style={styles.statusSelect}
							bsSize="xsmall"
							selected={this.props.relay.variables.status}
							onSelect={this.handleStatusChange}
							options={[{
								value: statusTypes.WAITING,
								name: 'Waiting',
							}, {
								value: statusTypes.PENDING,
								name: 'Pending',
							}, {
								value: statusTypes.IN_PROGRESS,
								name: 'In Progress',
							}, {
								value: statusTypes.COMPLETE,
								name: 'Complete',
							}, {
								value: statusTypes.REJECTED,
								name: 'Rejected',
							}]}
						/>
						<ButtonGroup
							style={styles.pageButtons}
							bsSize="xsmall"
						>
							<Button
								disabled={!this.hasPrev()}
								onClick={this.handlePrev}
							>
								<Glyphicon glyph="chevron-left"/>
							</Button>
							<Button
								disabled={!this.hasNext()}
								onClick={this.handleNext}
							>
								<Glyphicon glyph="chevron-right"/>
							</Button>
						</ButtonGroup>
					</div>
				}
			>
				<ItemList
					style={styles.itemList}
					items={this.props.viewer.items}
					offset={this.state.offset}
					limit={LIMIT}
				/>
			</Panel>
		);
	}
}
