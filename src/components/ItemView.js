import ItemList from './ItemList';
import React from 'react';
import { graphql } from 'react-relay';
import { refetchContainer } from '../utils/relay';
import SelectBar from './SelectBar';
import * as statusTypes from '../constants/statusTypes';
import Button from 'react-bootstrap/es/Button';
import ButtonGroup from 'react-bootstrap/es/ButtonGroup';
import Glyphicon from 'react-bootstrap/es/Glyphicon';
import Panel from 'react-bootstrap/es/Panel';
import { fillPanelBody, panelHeaderButtonCenter } from '../styles/bootstrap';

const LIMIT = 25;

export default
@refetchContainer(graphql`
	fragment ItemView_viewer on User @argumentDefinitions(
		status: { type: Status, defaultValue: IN_PROGRESS }
	) {
		items(status: $status, first: 2147483647) {
			edges {
				node {
					id
				}
			}
			...ItemList_items
		}
	}
`, graphql`
	query ItemViewRefetchQuery($status: Status) {
		viewer {
			...ItemView_viewer @arguments(status: $status)
		}
	}
`)
class ItemView extends React.Component {
	state = {
		status: statusTypes.IN_PROGRESS,
		offset: 0,
	};

	handleStatusChange = status => {
		this.props.relay.refetch({ status }, null, () => {
			this.setState({
				status,
				offset: 0,
			});
		});
	};

	hasPrev() {
		return this.state.offset > 0;
	}

	hasNext() {
		return this.state.offset + LIMIT < this.props.viewer.items.edges.length;
	}

	handlePrev = () => {
		this.setState(({ offset }) => ({
			offset: offset - LIMIT,
		}));
	};

	handleNext = () => {
		this.setState(({ offset }) => ({
			offset: offset + LIMIT,
		}));
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
			<Panel style={this.styles.panel}>
				<Panel.Heading>
					<Panel.Title>
						<SelectBar
							style={this.styles.statusSelect}
							bsSize="xsmall"
							selected={this.state.status}
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
					</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<ItemList
						style={this.styles.itemList}
						items={this.props.viewer.items}
						offset={this.state.offset}
						limit={LIMIT}
					/>
				</Panel.Body>
			</Panel>
		);
	}
}
