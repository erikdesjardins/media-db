import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import Button from 'react-bootstrap/es/Button';
import ButtonGroup from 'react-bootstrap/es/ButtonGroup';
import Glyphicon from 'react-bootstrap/es/Glyphicon';
import Panel from 'react-bootstrap/es/Panel';
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
		return (
			!this.props.relay.pendingVariables &&
			this.state.offset > 0
		);
	}

	hasNext() {
		return (
			!this.props.relay.pendingVariables &&
			this.state.offset + LIMIT < this.props.viewer.items.edges.length
		);
	}

	handlePrev = () => {
		this.setState({
			offset: this.state.offset - LIMIT,
		});
	};

	handleNext = () => {
		this.setState({
			offset: this.state.offset + LIMIT,
		});
	};

	styles = {
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

	render() {
		return (
			<Panel
				style={this.styles.panel}
				header={
					<div>
						<SelectBar
							style={this.styles.statusSelect}
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
							style={this.styles.pageButtons}
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
					style={this.styles.itemList}
					items={this.props.viewer.items}
					offset={this.state.offset}
					limit={LIMIT}
				/>
			</Panel>
		);
	}
}
