import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Panel } from 'react-bootstrap';
import { fillPanelBody } from '../styles/bootstrap';

@relay({
	fragments: {
		items: () => Relay.QL`
			fragment on ItemConnection {
				${ItemList.getFragment('items')}
			}
		`,
	},
})
export default class SearchList extends React.Component {
	styles = {
		panel: {
			overflow: 'hidden',
		},
		itemList: {
			...fillPanelBody,
		},
	};

	render() {
		return (
			<Panel style={this.styles.panel}>
				<ItemList
					style={this.styles.itemList}
					items={this.props.items}
				/>
			</Panel>
		);
	}
}
