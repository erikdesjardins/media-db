import ItemInfo from '../components/ItemInfo';
import ItemHistory from '../components/ItemHistory';
import React from 'react';
import ReactCSS from 'reactcss';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';
import * as sidebarTabTypes from '../constants/sidebarTabTypes';
import { Panel } from 'react-bootstrap';
import { panelHeaderButtonCenter } from '../styles/bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				${ItemInfo.getFragment('item')}
				${ItemHistory.getFragment('item')}
			}
		`,
		viewer: () => Relay.QL`
			fragment on User {
				${ItemInfo.getFragment('viewer')}
			}
		`,
	},
})
export default class SidebarInfo extends ReactCSS.Component {
	state = {
		activeTab: sidebarTabTypes.INFO,
	};

	handleTabChange = tab => {
		this.setState({ activeTab: tab });
	};

	classes() {
		return {
			default: {
				tabSelect: {
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
						is="tabSelect"
						bsSize="xsmall"
						selected={this.state.activeTab}
						onSelect={this.handleTabChange}
						options={[{
							value: sidebarTabTypes.INFO,
							name: 'Info',
						}, {
							value: sidebarTabTypes.HISTORY,
							name: 'History',
						}]}
					/>
				}
			>
				{this.state.activeTab === sidebarTabTypes.INFO && <ItemInfo item={this.props.item} viewer={this.props.viewer}/>}
				{this.state.activeTab === sidebarTabTypes.HISTORY && <ItemHistory item={this.props.item}/>}
			</Panel>
		);
	}
}
