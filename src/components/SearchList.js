import ItemList from './ItemList';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';
import Panel from 'react-bootstrap/es/Panel';
import { fillPanelBody } from '../styles/bootstrap';

export default
@fragmentContainer(graphql`
	fragment SearchList_items on ItemConnection {
		...ItemList_items
	}
`)
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
