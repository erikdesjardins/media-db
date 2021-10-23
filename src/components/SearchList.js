import ItemList from './ItemList';
import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

export default
@relay({
	fragments: {
		items: () => Relay.QL`
			fragment on ItemConnection {
				${ItemList.getFragment('items')}
			}
		`,
	},
})
class SearchList extends React.Component {
	render() {
		return (
			<fieldset className="SearchList">
				<ItemList items={this.props.items}/>
			</fieldset>
		);
	}
}
