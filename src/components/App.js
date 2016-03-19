import React from 'react';
import Relay from 'react-relay';
import relay from 'relay-decorator';

@relay({
	prepareVariables() {
		return {
			limit: 10,
			first: 0,
		};
	},
	fragments: {
		items: () => Relay.QL`
			fragment on Query {
				items(limit: $limit, first: $first) {
					edges {
						node {
							id,
							date,
						}
					}
				}
			}
		`,
	},
})
export default class App extends React.Component {
	render() {
		const { items: { edges } } = this.props;
		return (
			<div>
				<h1>{'Testing'}</h1>
				{edges.map(({ id, date }) =>
					<div key={id}>{'id:'}{id}{' '}{'date:'}{date}</div>
				)}
			</div>
		);
	}
}
