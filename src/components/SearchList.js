import ItemList from './ItemList';
import React from 'react';
import ReactCSS from 'reactcss';
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
export default class SearchList extends ReactCSS.Component {
	classes() {
		return {
			default: {
				itemList: {
					...fillPanelBody,
				},
			},
		};
	}

	render() {
		return (
			<Panel>
				<ItemList
					is="itemList"
					items={this.props.items}
				/>
			</Panel>
		);
	}
}
