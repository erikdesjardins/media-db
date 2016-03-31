import _ from 'lodash';
import ItemList from './ItemList';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as statusTypes from '../constants/statusTypes';
import { Glyphicon, PageItem, Pager, Panel } from 'react-bootstrap';
import { panelHeaderButtonCenter } from '../styles/bootstrap';

@relay({
	initialVariables: {
		status: statusTypes.IN_PROGRESS,
		after: null,
		breadcrumbs: [],
	},
	prepareVariables: ({ status, after }) => ({
		status,
		after,
		limit: 25,
	}),
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				items(status: $status, first: $limit, after: $after) {
					edges {
						cursor,
					}
					pageInfo {
						hasNextPage,
					}
					${ItemList.getFragment('items')}
				}
			}
		`,
	},
})
export default class ItemView extends ReactCSS.Component {
	handleStatusChange = status => {
		this.props.relay.setVariables({
			status,
			after: null,
			breadcrumbs: [],
		});
	};

	hasPrev() {
		return !!this.props.relay.variables.breadcrumbs.length;
	}

	hasNext() {
		return this.props.viewer.items.pageInfo.hasNextPage;
	}

	handlePrev = () => {
		const { breadcrumbs } = this.props.relay.variables;
		this.props.relay.setVariables({
			after: _.last(breadcrumbs),
			breadcrumbs: breadcrumbs.slice(0, -1),
		});
	};

	handleNext = () => {
		const { after, breadcrumbs } = this.props.relay.variables;
		this.props.relay.setVariables({
			after: _.last(this.props.viewer.items.edges).cursor,
			breadcrumbs: [...breadcrumbs, after],
		});
	};

	classes() {
		return {
			default: {
				statusSelect: {
					...panelHeaderButtonCenter,
				},
			},
		};
	}

	render() {
		return (
			<Panel
				header={
					<SelectBar
						is="statusSelect"
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
				}
			>
				<ItemList items={this.props.viewer.items}/>
				<Pager>
					<PageItem
						disabled={!this.hasPrev()}
						onSelect={this.handlePrev}
					>
						<Glyphicon glyph="chevron-left"/>
					</PageItem>
					{' '}
					<PageItem
						disabled={!this.hasNext()}
						onSelect={this.handleNext}
					>
						<Glyphicon glyph="chevron-right"/>
					</PageItem>
				</Pager>
			</Panel>
		);
	}
}
