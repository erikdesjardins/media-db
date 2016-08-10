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
	render() {
		const styles = {
			panel: {
				overflow: 'hidden',
			},
			itemList: {
				...fillPanelBody,
			},
		};

		return (
			<Panel style={styles.panel}>
				<ItemList
					style={styles.itemList}
					items={this.props.items}
				/>
			</Panel>
		);
	}
}
