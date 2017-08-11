import ItemInfo from '../components/ItemInfo';
import React from 'react';
import { graphql } from 'react-relay';
import { fragmentContainer } from '../utils/relay';

export default
@fragmentContainer(graphql`
	fragment SidebarInfo_item on Item {
		...ItemInfo_item
	}
	fragment SidebarInfo_viewer on User {
		...ItemInfo_viewer
	}
`)
class SidebarInfo extends React.Component {
	render() {
		return (
			<ItemInfo
				item={this.props.item}
				viewer={this.props.viewer}
			/>
		);
	}
}
