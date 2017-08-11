import ItemHistory from '../components/ItemHistory';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment SidebarHistory_item on Item {
		...ItemHistory_item
	}
`)
class SidebarHistory extends React.Component {
	render() {
		return (
			<ItemHistory item={this.props.item}/>
		);
	}
}
