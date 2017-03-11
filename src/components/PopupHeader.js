import AddActiveTabItemMutation from '../mutations/AddActiveTabItemMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import packageName from 'prop-loader?name!../../package.json';
import icon from '../images/icon32.png';
import { Button, Glyphicon, Navbar } from 'react-bootstrap';

const indexPath = 'index.html';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				itemForActiveTab
				providerMatchesActiveTab
				${AddActiveTabItemMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class PopupHeader extends React.Component {
	handleAddItem = () => {
		Relay.Store.commitUpdate(new AddActiveTabItemMutation({
			viewer: this.props.viewer,
		}));
	};

	styles = {
		img: {
			display: 'inline',
			margin: '-6px 10px -6px 0',
		},
	};

	render() {
		return (
			<Navbar staticTop>
				<Navbar.Header>
					<Navbar.Brand>
						<a href={indexPath}>
							<img style={this.styles.img} src={icon}/>
							{packageName}
						</a>
					</Navbar.Brand>
				</Navbar.Header>
				{!this.props.viewer.itemForActiveTab &&
					<Navbar.Form pullRight>
						<Button
							disabled={!this.props.viewer.providerMatchesActiveTab}
							onClick={this.handleAddItem}
						>
							<Glyphicon glyph="plus"/>
						</Button>
					</Navbar.Form>
				}
			</Navbar>
		);
	}
}
