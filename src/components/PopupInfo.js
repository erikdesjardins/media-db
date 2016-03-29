import ItemInfo from '../components/ItemInfo';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import { Grid } from 'react-bootstrap';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				itemForActiveTab {
					${ItemInfo.getFragment('item')}
				},
				${ItemInfo.getFragment('viewer')}
			}
		`,
	},
})
export default class PopupInfo extends React.Component {
	render() {
		return (
			<Grid fluid>
				{this.props.viewer.itemForActiveTab &&
					<ItemInfo
						item={this.props.viewer.itemForActiveTab}
						viewer={this.props.viewer}
					/>
				}
			</Grid>
		);
	}
}
