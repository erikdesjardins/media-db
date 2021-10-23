import ItemView from '../components/ItemView';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				${ItemView.getFragment('viewer')}
			}
		`,
	},
})
class Items extends React.Component {
	render() {
		return (
			<div className="Items">
				<div className="Items-list">
					<ItemView viewer={this.props.viewer}/>
				</div>
				<div className="Items-info">
					{this.props.children}
				</div>
			</div>
		);
	}
}
