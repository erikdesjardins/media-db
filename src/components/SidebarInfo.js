import ItemInfo from '../components/ItemInfo';
import ItemHistory from '../components/ItemHistory';
import React from 'react';
import Relay from 'react-relay';
import SelectBar from './SelectBar';
import relay from 'relay-decorator';

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

	handleTabChange = tab => {
		this.setState({ activeTab: tab });
	};

	render() {
		return (
			<div>
				<SelectBar
					bsSize="xsmall"
					selected={this.state.activeTab}
					onSelect={this.handleTabChange}
					options={[{
						value: 'info',
						name: 'Info',
					}, {
						value: 'history',
						name: 'History',
					}]}
				/>
				{this.state.activeTab === 'info' && <ItemInfo item={this.props.item}/>}
				{this.state.activeTab === 'history' && <ItemHistory item={this.props.item}/>}
			</div>
		);
	}
}
