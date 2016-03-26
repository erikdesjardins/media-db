import ItemInfo from '../components/ItemInfo';
import ItemHistory from '../components/ItemHistory';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Button, ButtonGroup } from 'react-bootstrap';

@relay({
	fragments: {
		item: () => Relay.QL`
			fragment on Item {
				${ItemInfo.getFragment('item')}
				${ItemHistory.getFragment('item')}
			}
		`,
	},
})
export default class SidebarInfo extends React.Component {
	state = {
		activeTab: 'info',
	};

	handleTabChange(tab) {
		this.setState({ activeTab: tab });
	}

	isActiveTab(tab) {
		return this.state.activeTab === tab;
	}

	render() {
		return (
			<div>
				<ButtonGroup bsSize="xsmall">
					<Button
						active={this.isActiveTab('info')}
						onClick={() => this.handleTabChange('info')}
					>
						{'Info'}
					</Button>
					<Button
						active={this.isActiveTab('history')}
						onClick={() => this.handleTabChange('history')}
					>
						{'History'}
					</Button>
				</ButtonGroup>
				{this.state.activeTab === 'info' && <ItemInfo item={this.props.item}/>}
				{this.state.activeTab === 'history' && <ItemHistory item={this.props.item}/>}
			</div>
		);
	}
}
