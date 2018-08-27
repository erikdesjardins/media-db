import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import Panel from 'react-bootstrap/es/Panel';
import { fillPanelBody } from '../styles/bootstrap';

export default
@relay({
	fragments: {
		items: () => Relay.QL`
			fragment on ItemConnection {
				${ItemList.getFragment('items')}
			}
		`,
	},
})
class SearchList extends React.Component {
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
				<Panel.Body>
					<ItemList
						style={this.styles.itemList}
						items={this.props.items}
					/>
				</Panel.Body>
			</Panel>
		);
	}
}
