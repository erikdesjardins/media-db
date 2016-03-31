import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Panel } from 'react-bootstrap';

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
		return (
			<Panel>
				<ItemList items={this.props.items}/>
			</Panel>
		);
	}
}
