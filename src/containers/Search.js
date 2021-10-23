import React from 'react';
import Relay from 'react-relay';
import SearchList from '../components/SearchList';
import relay from 'relay-decorator';

export default
@relay({
	initialVariables: {
		query: '',
		preview: true,
		limit: 25,
	},
	prepareVariables: ({ query, preview }) => ({
		query,
		limit: preview ? 25 : 2147483647,
	}),
	fragments: {
		viewer: () => Relay.QL`
			fragment on User {
				searchItems(query: $query, first: $limit) {
					${SearchList.getFragment('items')}
				}
			}
		`,
	},
})
class Search extends React.Component {
	render() {
		return (
			<SearchList items={this.props.viewer.searchItems}/>
		);
	}
}
