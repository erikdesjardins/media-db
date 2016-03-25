import ItemList from '../components/ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Grid, PageHeader } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${ItemList.getFragment('viewer')}
			}
		`,
	},
})
export default class Items extends React.Component {
	render() {
		return (
			<Grid fluid>
				<PageHeader>{'Items'}</PageHeader>
				<ItemList viewer={this.props.viewer}/>
				{this.props.children}
			</Grid>
		);
	}
}
