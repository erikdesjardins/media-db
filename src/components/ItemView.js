import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import LinkButton from './LinkButton';

const LIMIT = 25;

export default
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
class ItemView extends React.Component {
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
		this.setState(({ offset }) => ({
			offset: offset - LIMIT,
		}));
	};

	handleNext = () => {
		this.setState(({ offset }) => ({
			offset: offset + LIMIT,
		}));
	};

	render() {
		return (
			<fieldset className="ItemView">
				<legend className="ItemView-legend">
					<SelectBar
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
				</legend>
				<div className="ItemView-nextPrev">
					<LinkButton
						disabled={!this.hasPrev()}
						onClick={this.handlePrev}
					>
						{'<--'}
					</LinkButton>
					{' '}
					<LinkButton
						disabled={!this.hasNext()}
						onClick={this.handleNext}
					>
						{'-->'}
					</LinkButton>
				</div>
				<ItemList
					items={this.props.viewer.items}
					offset={this.state.offset}
					limit={LIMIT}
				/>
			</fieldset>
		);
	}
}
