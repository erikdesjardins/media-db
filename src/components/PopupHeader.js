import AddActiveTabItemMutation from '../mutations/AddActiveTabItemMutation';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';
import packageName from 'prop?name!../../package.json';
import icon from '../images/icon32.png';
import { Button, Glyphicon, Navbar } from 'react-bootstrap';

// *sigh*
const NavbarBrand = Navbar.Brand;
const NavbarForm = Navbar.Form;
const NavbarHeader = Navbar.Header;

const indexPath = 'index.html';

@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				itemForActiveTab,
				providerMatchesActiveTab,
				${AddActiveTabItemMutation.getFragment('viewer')}
			}
		`,
	},
})
export default class PopupHeader extends React.Component {
	handleAddItem = () => {
		if (!this.props.viewer.providerMatchesActiveTab) return;

		Relay.Store.commitUpdate(new AddActiveTabItemMutation({
			viewer: this.props.viewer,
		}));
	};

	render() {
		const styles = {
			img: {
				display: 'inline',
				margin: '-6px 10px -6px 0',
			},
		};

		return (
			<Navbar staticTop>
				<NavbarHeader>
					<NavbarBrand>
						<a href={indexPath}>
							<img style={styles.img} src={icon}/>
							{packageName}
						</a>
					</NavbarBrand>
				</NavbarHeader>
				{!this.props.viewer.itemForActiveTab &&
					<NavbarForm pullRight>
						<Button
							disabled={!this.props.viewer.providerMatchesActiveTab}
							onClick={this.handleAddItem}
						>
							<Glyphicon glyph="plus"/>
						</Button>
					</NavbarForm>
				}
			</Navbar>
		);
	}
}
